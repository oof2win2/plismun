import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { z } from "zod"
import { hashPassword } from "@/utils/dbUtil"
import { saveSessionData } from "@/utils/auth"
import validator from "validator"
import { User } from "@prisma/client"

const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),

  firstname: z.string(),
  lastname: z.string(),

  phone: z.string().nullable(),
  birthdate: z
    .string()
    .refine((date) => validator.isISO8601(date))
    .transform((x) => new Date(x)),
  nationality: z.string(),
  gender: z.string().nullable(),
  schoolname: z.string().nullable(),
  dietary: z.string().nullable(),
})

type CommitteeResponse = ApiResponse<User>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommitteeResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).send({
      status: "error",
      errors: [
        {
          statusCode: 405,
          message: "Method not allowed",
          description: "The method is not allowed for the requested URL.",
        },
      ],
    })
  }

  const parsed = SignupSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          statusCode: 422,
          message: "Invalid body",
          description: parsed.error.message,
        },
      ],
    })
  }

  const { password } = parsed.data
  const hashedPassword = await hashPassword(password)

  // check if they already aren't in the database
  const existing = await db.user.findFirst({
    where: {
      email: parsed.data.email,
    },
  })
  if (existing) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          statusCode: 400,
          message: "User already exists",
          description: "The user already exists in the database.",
        },
      ],
    })
  }

  const user = await db.user.create({
    data: {
      ...parsed.data,
      password: hashedPassword,
    },
  })

  // save their user in the session
  await saveSessionData(req, res, user, { user }, null)

  return res.status(200).json({
    status: "success",
    data: user,
  })
}
