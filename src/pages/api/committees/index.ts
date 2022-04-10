import { db } from "@/utils/db"
import { NextApiRequest, NextApiResponse } from "next"
import type { ApiResponse } from "@/utils/types"
import { Committee, CommiteeType } from "@/utils/validators"
import { z } from "zod"
import { authAPI, validate } from "@/utils/middlewares"
import { ApiRequest, PopulatedApiRequest } from "@/utils/types"
import nc from "next-connect"

const handler = nc<ApiRequest, NextApiResponse>()

type CommitteeResponse = ApiResponse<CommiteeType[] | CommiteeType>

const getCommitteeQuery = z.object({
  id: z
    .union([z.string().regex(/^\d+$/), z.array(z.string().regex(/^\d+$/))])
    .transform((x) => (Array.isArray(x) ? x.map(Number) : Number(x)))
    .optional(),
})
type getCommitteeQueryType = z.infer<typeof getCommitteeQuery>
handler.get(
  validate({
    query: getCommitteeQuery,
  }),
  async (req, res) => {
    const { id } = req.query as unknown as getCommitteeQueryType
    if (id) {
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
)

export default handler
