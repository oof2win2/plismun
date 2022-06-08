import { Committee, CommitteeCountries, User } from "@prisma/client"
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

export type ExtraData =
  | {
      status: "pending"
    }
  | ({ status: "accepted" } & (
      | {
          type: "delegation"
          delegation: Delegation
          chairs: ChairApplication[]
          allCommitteeMembers: AppliedUser[]
          users: User[]
          committees: Committee[]
          countries: CommitteeCountries[]
        }
      | {
          type: "delegate"
          committee: Committee
          allCommitteeMembers: AppliedUser[]
          users: User[]
          chairs: ChairApplication[]
          committees: Committee[]
          countries: CommitteeCountries[]
        }
      | {
          type: "chair"
          committee: Committee
          allCommitteeMembers: AppliedUser[]
          users: User[]
          chairs: ChairApplication[]
          committees: Committee[]
          countries: CommitteeCountries[]
        }
    ))

export const logout = createAction("user/logout")
export const login = createAction<User>("user/login")
export const apply = createAction<Application>("user/apply")
export const setExtraData = createAction<ExtraData>("user/setExtraData")
