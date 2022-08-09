import { db } from "@/utils/db"
import { authAPI, validate } from "@/utils/middlewares"
import { ApiRequest, PopulatedApiRequest } from "@/utils/types"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import { ReplyDelegateApplication } from "@/utils/validators"
import { sendDelegateAcceptance, sendDelegateDeny } from "@/utils/mail"

const handler = nc<ApiRequest, NextApiResponse>()

handler.put(
  authAPI,
  validate({
    body: ReplyDelegateApplication,
  }),
  async (req: ApiRequest, res) => {
    const result: ReplyDelegateApplication = req.body

    if (!req.populated)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        description: "You are not logged in",
      })

    const user = await db.user.findFirst({
      where: {
        id: result.userId,
      },
    })

    if (!user) {
      return res.status(500).json({
        statusCode: 500,
        message: "Internal Server Error",
        description: "Could not find committee, country, or user",
      })
    }

    // The user was denied their application
    if (!result.success) {
      sendDelegateDeny(user)
      await db.appliedUser.update({
        where: {
          userId: user.id,
        },
        data: {
          denied: true,
        },
      })
      return res.status(200).json({
        statusCode: 200,
        message: "Success",
      })
    } else {
      if (result.finalCommittee === null || result.finalCountry === null) {
        return res.status(400).json({
          statusCode: 400,
          message: "Bad Request",
          description: "You must select a committee and country",
        })
      }

      const committee = await db.committee.findFirst({
        where: {
          id: result.finalCommittee,
        },
      })
      const country = await db.committeeCountries.findFirst({
        where: {
          country: result.finalCountry,
        },
      })
      if (!committee || !country) {
        return res.status(500).json({
          statusCode: 500,
          message: "Internal Server Error",
          description: "Could not find committee, country, or user",
        })
      }
      await db.committeeCountries.update({
        where: {
          id: country.id,
        },
        data: {
          userId: user.id,
        },
      })
      await db.appliedUser.update({
        where: {
          userId: user.id,
        },
        data: {
          finalCommittee: committee.id,
          finalCountry: country.country,
        },
      })
      sendDelegateAcceptance(user, committee, country)
      return res.status(200).json({
        statusCode: 200,
        message: "Success",
      })
    }
  }
)

export default handler
