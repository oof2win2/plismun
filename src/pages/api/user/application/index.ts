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
    return res.status(200).json({
      statusCode: 200,
      data: {
        type: "delegation",
        application: delegation,
      },
    })
  }

  const delegate = await db.appliedUser.findFirst({
    where: {
      userId: req.user.id,
    },
  })

  if (delegate) {
    return res.status(200).json({
      statusCode: 200,
      data: {
        type: "delegate",
        application: delegate,
      },
    })
  }

  const chair = await db.chairApplication.findFirst({
    where: {
      userId: req.user.id,
    },
  })

  if (chair) {
    return res.status(200).json({
      statusCode: 200,
      data: {
        type: "chair",
        application: chair,
      },
    })
  }

  return res.status(404).json({
    statusCode: 404,
    message: "Not Found",
    description: "You have not submitted an application yet",
  })
})

export default handler
