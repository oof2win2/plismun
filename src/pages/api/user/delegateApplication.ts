import { db } from "@utils/db"
import { authAPI, validate } from "@utils/middlewares"
import { ApiRequest, PopulatedApiRequest } from "@utils/types"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import { z } from "zod"
import { committeeCountries, committees } from "@utils/statics"

const handler = nc<ApiRequest, NextApiResponse>()

// TODO: finish this

// Get the user's application
handler.get<PopulatedApiRequest, NextApiResponse>(authAPI, async (req, res) => {
  // get current user's delegate application from the database, or return 404 if not found
  const application = await db.appliedUser.findFirst({
    where: {
      userId: req.user.id,
    },
  })
  if (application)
    res.status(200).json({
      statusCode: 200,
      data: application,
    })
  return res.status(404).json({
    statusCode: 404,
    message: "Not Found",
    description: "You have not submitted an application yet",
  })
})

// Submit a new application
// this schema validates that the request body contains the required fields and they are valid
// committee choices need to be valid committee IDs
const delegationApplySchema = z
  .object({
    choice1committee: z
      .number()
      .refine((cId) => committees.find((c) => c.id === cId)),
    choice1country: z.string(),
    choice2committee: z
      .number()
      .refine((cId) => committees.find((c) => c.id === cId)),
    choice2country: z.string(),
    choice3committee: z
      .number()
      .refine((cId) => committees.find((c) => c.id === cId)),
    choice3country: z.string(),
    delegationId: z
      .number()
      .nullable()
      .refine(async (id) => {
        if (id === null) return true
        const delegation = await db.delegation.findFirst({
          where: {
            delegationId: id,
          },
        })
        if (delegation) return true
        return false
      }),
    // experience and motivation both have a min length of 20 and max of 2k chars
    experience: z.string().min(20).max(2000),
    motivation: z.string().min(20).max(2000),
    // shirt size or null if no shirt desired
    shirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).nullable(),
  })
  .superRefine((body, ctx) => {
    // check if each choice's country is valid in it's committee
    const choice1valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice1committee &&
        c.countryCode === body.choice1country
    )
    if (!choice1valid)
      ctx.addIssue({
        code: "custom",
        path: ["choice1country"],
        message: "Invalid country and committee combination",
      })

    const choice2valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice2committee &&
        c.countryCode === body.choice2country
    )
    if (!choice2valid)
      ctx.addIssue({
        code: "custom",
        path: ["choice1country"],
        message: "Invalid country and committee combination",
      })

    const choice3valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice3committee &&
        c.countryCode === body.choice3country
    )
    if (!choice3valid)
      ctx.addIssue({
        code: "custom",
        path: ["choice1country"],
        message: "Invalid country and committee combination",
      })
  })
type delegationApplySchemaType = z.infer<typeof delegationApplySchema>

handler.put(
  validate({
    body: delegationApplySchema,
  }),
  authAPI,
  async (req: ApiRequest, res) => {
    const {
      choice1committee,
      choice1country,
      choice2committee,
      choice2country,
      choice3committee,
      choice3country,
      delegationId,
      experience,
      motivation,
      shirtSize,
    }: delegationApplySchemaType = req.body

    if (!req.populated)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        description: "You are not logged in",
      })

    const existingApplication = await db.appliedUser.findFirst({
      where: {
        userId: req.user.id,
      },
    })

    if (existingApplication)
      return res.status(403).json({
        statusCode: 403,
        message: "Forbidden",
        description:
          "You have already submitted an application, there is only one allowed per user",
      })

    // submit a new application for the user, since they dont have one yet
    // TODO: send an email to the user
    const newApplication = await db.appliedUser.create({
      data: {
        userId: req.user.id,
        choice1committee,
        choice1country,
        choice2committee,
        choice2country,
        choice3committee,
        choice3country,
        delegationId,
        experience,
        motivation,
        // the payment status is always pending initially
        paymentStatus: "pending",
        shirtSize,
      },
    })

    return res.status(201).json({
      statusCode: 201,
      data: newApplication,
    })
  }
)

export default handler
