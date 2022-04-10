import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { User } from "@prisma/client"

type UserResponse = ApiResponse<User[]>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  const users = await db.user.findMany()
  return res.send({
    status: "success",
    data: users,
  })
}
