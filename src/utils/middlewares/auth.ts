import { getSessionData } from "@/utils/auth"
import { ApiRequest } from "@/utils/types"
import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"

/**
 * Check if a user is authenticated and if so, allow them to access the page.
 * API use only currently
 */
export async function authAPI(
  req: ApiRequest,
  res: NextApiResponse,
  next: NextHandler
) {
  const sessionData = await getSessionData(req.cookies)
  if (!sessionData) {
    return res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
      description: "You must be logged in to access this resource.",
    })
  }
  req.populated = true
  if (req.populated) {
    req.sessionData = sessionData
    req.user = sessionData.user
  }
  next()
}
