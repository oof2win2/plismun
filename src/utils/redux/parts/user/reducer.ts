import { User } from "@prisma/client"
import { createReducer } from "@reduxjs/toolkit"
import { login, logout } from "./actions"

type UserState = {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      state.user = action.payload
    })
    .addCase(logout, (state) => {
      state.user = null
    })
})
