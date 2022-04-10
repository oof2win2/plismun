// Login an existing user if their session token is no longer valid (e.g. they logged out)

import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { clearSessionData } from "@/utils/auth"

type LogoutResponse = ApiResponse<null>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
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

  // save session data
  await clearSessionData(res)

  return res.status(200).json({
    status: "success",
    data: null,
  })
}
