import { authAPI, validate } from "@utils/middlewares"
import nc from "next-connect"
import { z } from "zod"

const handler = nc()

// TODO: finish this

// Get the user's application
handler.get(authAPI, async (req, res) => {
  // get current user's delegate application from the database, or return 404 if not found
})

// Submit a new application
handler.put(
  validate({
    body: z.object({}),
  }),
  authAPI,
  async (req, res) => {
    // submit a new application if the user has not already submitted one
  }
)

export default handler
