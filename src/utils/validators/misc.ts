import { z } from "zod"
import { User } from "./baseTypes"

// JWT cookie session data
export const SessionData = z.object({
  jti: z.string(),
  iat: z.number(),
  exp: z.number(),
  aud: z.number(),
  data: z.object({
    user: User,
  }),
})
export type SessionDataType = z.infer<typeof SessionData>
