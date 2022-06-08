import { User } from "@prisma/client"
import { createReducer } from "@reduxjs/toolkit"
import { login, logout, apply, setExtraData, ExtraData } from "./actions"
import type { Application } from "./actions"

type UserState = {
  user: User | null
  application: Application | null
  extraData: ExtraData | null
}

const initialState: UserState = {
  user: null,
  application: null,
  extraData: null,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.user = action.payload
    })
    .addCase(logout, (state) => {
      state.user = null
      state.application = null
    })
    .addCase(apply, (state, action) => {
      state.application = action.payload
    })
    .addCase(setExtraData, (state, action) => {
      state.extraData = action.payload
    })
})
