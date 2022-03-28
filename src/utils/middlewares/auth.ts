import { getSessionData } from "@utils/auth"
import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"

/**
 * Check if a user is authenticated and if so, allow them to access the page.
 * API use only currently
 */
export function authAPI() {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    const user = await getSessionData(req)
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized",
        description: "You must be logged in to access this resource.",
      })
    }
    next()
  }
}
