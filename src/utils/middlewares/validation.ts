import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { SafeParseError, z } from "zod"

/**
 * Validate a user's request with zod
 */
export function validate({
  body,
  query,
  async = false,
}: {
  body?: z.ZodTypeAny
  query?: z.ZodTypeAny
  async?: boolean
}) {
  // we have the schemas given as the parameter to this function
  // the function that we return is executed on each request by next-connect
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    const errors: z.ZodError["issues"][] = []
    if (body) {
      const parsed = async
        ? await body.safeParseAsync(req.body)
        : body.safeParse(req.body)
      if (parsed.success === false) {
        errors.push(parsed.error.issues)
      } else {
        req.body = parsed.data
      }
    }
    if (query) {
      const parsed = async
        ? await query.safeParseAsync(req.query)
        : query.safeParse(req.query)
      if (parsed.success === false) {
        errors.push(parsed.error.issues)
      } else {
        req.query = parsed.data
      }
    }
    if (errors.length) {
      // if there are errors, return a 422
      return res.status(422).json({
        statusCode: 422,
        message: "Bad Request",
        description: errors.flat(),
      })
    }
    // there were no errors validating, so we can continue with the request
    next()
  }
}
