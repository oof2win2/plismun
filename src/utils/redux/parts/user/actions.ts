import { User } from "@prisma/client"
import { createAction } from "@reduxjs/toolkit"
import type { Delegation, AppliedUser, ChairApplication } from "@prisma/client"

export type Application =
  | {
      type: "delegation"
      application: Delegation
    }
  | {
      type: "delegate"
      application: AppliedUser
    }
  | {
      type: "chair"
      application: ChairApplication
    }

export const logout = createAction("user/logout")
export const login = createAction<User>("user/login")
export const apply = createAction<Application>("user/apply")
