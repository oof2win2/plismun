// This file checks whether a user is already authenticated by their session cookie.
// This means they will be logged in on the page without needing to do anything.
// This endpoint should be hit only once, when the user first visits the site.

import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { User } from "@prisma/client"
import { getSessionData } from "@/utils/auth"

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

  const data = await getSessionData(req.cookies)

  if (!data) {
    return res.status(401).send({
      status: "error",
      errors: [
        {
          statusCode: 401,
          message: "Unauthorized",
          description: "You must be logged in to access this resource.",
        },
      ],
    })
  }

  return res.status(200).send({
    status: "success",
    data: data.user,
  })
}
