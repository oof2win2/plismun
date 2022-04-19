import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { z } from "zod"
import { CommitteeCountries } from "@prisma/client"

type CommitteeResponse = ApiResponse<CommitteeCountries[]>

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
  const unverified = await db.committeeCountries.findMany({
    where: {
      committeeId: id,
    },
  })

  return res.status(200).json({
    status: "success",
    data: unverified,
  })
}
