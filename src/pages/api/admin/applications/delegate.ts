import { db } from "@/utils/db"
import { authAPI, validate } from "@/utils/middlewares"
import { ApiRequest, PopulatedApiRequest } from "@/utils/types"
import { NextApiRequest, NextApiResponse } from "next"
import nc from "next-connect"
import { z } from "zod"
import { DelegateApply, refineDelegateApply } from "@/utils/validators"

const handler = nc<ApiRequest, NextApiResponse>()

handler.put(
  authAPI,
  // validate({

  // }),
  async (req: ApiRequest, res) => {
    // TODO: finish this for successful / wrong delegate applications
  }
)

// TODO: update your current application

export default handler
