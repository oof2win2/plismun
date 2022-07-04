import { db } from "@/utils/db"
import { authAPI, validate } from "@/utils/middlewares"
import { ApiRequest, PopulatedApiRequest } from "@/utils/types"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"

const handler = nc<ApiRequest, NextApiResponse>()

// Get the user's application based on their login state
handler.get<PopulatedApiRequest, NextApiResponse>(authAPI, async (req, res) => {
  // get current user's delegate application from the database, or return 404 if not found
  const delegation = await db.delegation.findFirst({
    where: {
      delegationLeaderId: req.user.id,
    },
  })

  if (delegation) {
    const chairs = await db.chairApplication.findMany({
      where: {
        delegationId: delegation.delegationId,
      },
    })
    const delegates = await db.appliedUser.findMany({
      where: {
        delegationId: delegation.delegationId,
      },
    })
    res.status(200).json({
      statusCode: 200,
      data: {
        status: "accepted",
        type: "delegation",
        delegation,
        chairs,
        delegates,
      },
    })
    return
  }

  const delegate = await db.appliedUser.findFirst({
    where: {
      userId: req.user.id,
    },
  })

  if (delegate) {
    if (!delegate.finalCommittee)
      return res.status(200).json({
        status: "pending",
      })
    const committee = await db.committee.findFirst({
      where: {
        id: delegate.finalCommittee,
      },
    })
    const allCommitteeMembers = committee
      ? await db.appliedUser.findMany({
          where: {
            finalCommittee: committee.id,
          },
        })
      : []
    const chairs = committee
      ? await db.chairApplication.findMany({
          where: {
            finalCommittee: committee.id,
          },
        })
      : []
    const users = committee
      ? await db.user.findMany({
          where: {
            id: {
              in: [
                allCommitteeMembers.map((mem) => mem.userId),
                chairs.map((c) => c.userId),
              ].flat(),
            },
          },
        })
      : []
    const countries = committee
      ? await db.committeeCountries.findMany({
          where: {
            committeeId: committee.id,
            userId: {
              not: null,
            },
          },
        })
      : []
    return res.status(200).json({
      statusCode: 200,
      data: {
        status: "accepted",
        type: "delegate",
        committee,
        application: delegate,
        allCommitteeMembers: allCommitteeMembers,
        users: users,
        chairs: chairs,
        countries: countries,
      },
    })
  }

  const chair = await db.chairApplication.findFirst({
    where: {
      userId: req.user.id,
    },
  })

  if (chair) {
    if (chair.finalCommittee == null) {
    }
    const committee =
      chair.finalCommittee != null
        ? await db.committee.findFirst({
            where: {
              id: chair.finalCommittee,
            },
          })
        : null

    res.status(200).json({
      statusCode: 200,
      data: {
        status: "accepted",
        type: "chair",
        application: chair,
      },
    })
    return
  }

  return res.status(404).json({
    statusCode: 404,
    message: "Not Found",
    description: "You have not submitted an application yet",
  })
})

export default handler
