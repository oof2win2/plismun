// Login an existing user if their session token is no longer valid (e.g. they logged out)

import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { LoginSchema } from "@/utils/validators"
import { User } from "@prisma/client"
import { checkPassword } from "@/utils/dbUtil"
import { saveSessionData } from "@/utils/auth"

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

  const parsed = LoginSchema.safeParse(req.body)

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

  const { password, email } = parsed.data

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  })

  if (!user) {
    return res.status(404).json({
      status: "error",
      errors: [
        {
          statusCode: 404,
          message: "Email or password is wrong",
          description: "Email or password is wrong",
        },
      ],
    })
  }

  const isIdenticalPassword = await checkPassword(password, user.password)
  if (!isIdenticalPassword) {
    return res.status(400).json({
      status: "error",
      errors: [
        {
          statusCode: 400,
          message: "Email or password is wrong",
          description: "Email or password is wrong",
        },
      ],
    })
  }

  // save session data
  await saveSessionData(res, user, null)

  return res.status(200).json({
    status: "success",
    data: user,
  })
}
