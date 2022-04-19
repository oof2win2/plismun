import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { Committee, CommiteeType } from "@/utils/validators"
import { z } from "zod"

type CommitteeResponse = ApiResponse<CommiteeType[] | CommiteeType>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommitteeResponse>
) {
  const { id: stringId } = req.query
  const parsedQuery = z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .safeParse(stringId)

  if (!parsedQuery.success) {
    res.status(400).json({
      status: "error",
      errors: [
        {
          statusCode: 422,
          message: "Invalid query parameters",
          description: parsedQuery.error.message,
        },
      ],
    })
    return
  }

  const id = parsedQuery.data
  const unverified = await db.committee.findFirst({
    where: {
      id: id,
    },
  })
  if (!unverified) {
    return res.status(404).json({
      status: "error",
      errors: [
        {
          statusCode: 404,
          message: "Committee not found",
          description: "The committee with the given ID was not found",
        },
      ],
    })
  }
  const verified = Committee.parse(unverified)
  return res.status(200).json({
    status: "success",
    data: verified,
  })
}
