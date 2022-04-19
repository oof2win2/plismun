import { User } from "@prisma/client"
import { createReducer } from "@reduxjs/toolkit"
import { login, logout, apply } from "./actions"
import type { Application } from "./actions"

type UserState = {
  user: User | null
  application: Application | null
}

const initialState: UserState = {
  user: null,
  application: null,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.user = action.payload
    })
    .addCase(logout, (state) => {
      state.user = null
    })
    .addCase(apply, (state, action) => {
      if (state.application)
        throw new Error("Application already exists, cannot have multiple")
      state.application = action.payload
    })
})
