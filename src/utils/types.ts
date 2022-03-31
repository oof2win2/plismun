import { User } from "@prisma/client"
import { NextApiRequest } from "next"
import { SessionDataType } from "./validators"

export type ApiError = {
  statusCode: number
  message: string
  description: string
}

export type ApiResponse<D> =
  | {
      status: "success"
      data: D
    }
  | {
      status: "error"
      errors: ApiError[]
    }

type ApiRequestExtensions = {
  populated: boolean
} & (
  | {
      populated: false
    }
  | {
      populated: true
      sessionData: SessionDataType
      user: User
    }
)

export type ApiRequest = NextApiRequest & ApiRequestExtensions
export type PopulatedApiRequest = ApiRequest & { populated: true }
