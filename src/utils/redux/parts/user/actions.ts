import { User } from "@prisma/client"
import { createAction } from "@reduxjs/toolkit"

export const logout = createAction("user/logout")
export const login = createAction<User>("user/login")
