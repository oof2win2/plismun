import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { CommitteeCountries } from "@prisma/client"

type CommitteeResponse = ApiResponse<CommitteeCountries[]>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommitteeResponse>
) {
  const unverified = await db.committeeCountries.findMany()

  return res.status(200).json({
    status: "success",
    data: unverified,
  })
}
