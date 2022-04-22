import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { z } from "zod"
import { hashPassword } from "@/utils/dbUtil"
import { saveSessionData } from "@/utils/auth"
import validator from "validator"
import { User } from "@prisma/client"
import { SignupSchema } from "@/utils/validators"

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

  const dataWithoutConfirm = Object.assign({}, parsed.data)
  // @ts-ignore
  delete dataWithoutConfirm.passwordConfirm
  const user = await db.user.create({
    data: {
      ...dataWithoutConfirm,
      password: hashedPassword,
    },
  })

  // save their user in the session
  await saveSessionData(res, user, null)

  return res.status(200).json({
    status: "success",
    data: user,
  })
}
