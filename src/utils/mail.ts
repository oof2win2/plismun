import { ChairApplication, Committee, Delegation, User } from "@prisma/client"
import nodemailer from "nodemailer"
import ENV from "./env"
import { Application } from "./redux/parts/user"
import fs from "fs/promises"
import path from "path"

const transport = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    user: ENV.EMAIL_USERNAME,
    pass: ENV.EMAIL_PASSWORD,
  },
})

export async function sendDelegationEmail(user: User, application: Delegation) {
  let text = await fs.readFile(
    path.join(".", "src", "utils", "templates", "delegation.txt"),
    "utf8"
  )
  let html = await fs.readFile(
    path.join(".", "src", "utils", "templates", "delegation.html"),
    "utf8"
  )
  text = text
    .replaceAll("{FIRSTNAME}", user.firstname)
    .replaceAll("{LASTNAME}", user.lastname)
    .replaceAll("{DELEGATION}", application.name)
  html = html
    .replaceAll("{FIRSTNAME}", user.firstname)
    .replaceAll("{LASTNAME}", user.lastname)
    .replaceAll("{DELEGATION}", application.name)
  transport.sendMail({
    to: user.email,
    from: ENV.EMAIL_USERNAME,
    subject: "Your PLISMUN '23 Delegation Application",
    text: text,
    html: html,
  })
  transport.sendMail({
    to: ENV.NOTIFICATIONEMAIL,
    from: ENV.EMAIL_USERNAME,
    subject: "New PLISMUN '23 Delegation Application",
    text: text,
    html: html,
  })
}

export async function sendChairEmail(
  user: User,
  application: ChairApplication,
  committees: Committee[],
  delegation: Delegation | null
) {
  let messages = []
  for (const type of ["chair", "chairInfo"]) {
    const data = []
    for (const filetype of ["txt", "html"]) {
      data.push(
        await fs.readFile(
          path.join(".", "src", "utils", "templates", `${type}.${filetype}`),
          "utf8"
        )
      )
    }
    messages.push(data)
  }
  const delegationText = delegation
    ? `You are part of the ${delegation.name} delegation`
    : "You have not applied as part of a delegation"
  messages = messages.map((ending) => {
    return ending.map((msg) => {
      return msg
        .replaceAll("{FIRSTNAME}", user.firstname)
        .replaceAll("{LASTNAME}", user.lastname)
        .replaceAll(
          "{COM1}",
          committees.find((c) => c.id === application.choice1committee)
            ?.displayname || ""
        )
        .replaceAll(
          "{COM2}",
          committees.find((c) => c.id === application.choice2committee)
            ?.displayname || ""
        )
        .replaceAll(
          "{COM3}",
          committees.find((c) => c.id === application.choice3committee)
            ?.displayname || ""
        )
        .replaceAll("{DELEGATIONTEXT}", delegationText)
        .replaceAll("{MOTIVATION}", application.motivation)
        .replaceAll("{EXPERIENCE}", application.experience)
        .replaceAll("{PHONE}", application.phone)
        .replaceAll("{EMAIL}", user.email)
        .replaceAll("{SCHOOL}", application.school ?? "Not provided")
    })
  })
  transport.sendMail({
    to: user.email,
    subject: "Your PLISMUN '23 Chair Application",
    text: messages[0][0],
    html: messages[0][1],
  })
  transport.sendMail({
    to: ENV.NOTIFICATIONEMAIL,
    subject: "New PLISMUN '23 Chair Application",
    text: messages[1][0],
    html: messages[1][1],
  })
}

export default transport
