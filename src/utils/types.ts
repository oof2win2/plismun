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
