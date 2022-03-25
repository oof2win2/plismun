import { db } from "@utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@utils/types"
import { Committee, CommiteeType } from "@utils/validators"
import { z } from "zod"

type CommitteeResponse = ApiResponse<CommiteeType[] | CommiteeType>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommitteeResponse>
) {
  const { id: stringId } = req.query
  if (stringId) {
    const parsedQuery = z
      .union([z.string().regex(/^\d+$/), z.array(z.string().regex(/^\d+$/))])
      .transform((x) => (Array.isArray(x) ? x.map(Number) : Number(x)))
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
    if (Array.isArray(id)) {
      const unverified = await db.committee.findMany({
        where: {
          id: {
            in: id,
          },
        },
      })
      const verified = z.array(Committee).parse(unverified)
      return res.status(200).json({
        status: "success",
        data: verified,
      })
    }
    const unverified = await db.committee.findFirst({
      where: {
        id: id,
      },
    })
    if (!unverified)
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
    const verified = Committee.parse(unverified)
    return res.status(200).json({
      status: "success",
      data: verified,
    })
  }
  try {
    const unverified = await db.committee.findMany()
    console.log(unverified.length)
    const verified = z.array(Committee).parse(unverified)
    const response: CommitteeResponse = {
      status: "success",
      data: verified,
    }
    res.status(200).send(response)
  } catch (error) {
    console.error(error)
    res.status(500).send({
      status: "error",
      errors: [
        {
          statusCode: 500,
          message: "Internal Server Error",
          description:
            "An unexpected error occurred while processing your request.",
        },
      ],
    })
  }
}
