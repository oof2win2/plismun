// Prisma database connection

import { PrismaClient } from "@prisma/client"
import { setCommitteeCountries, setCommittees } from "./cache"
const IS_PROD = process.env.NODE_ENV === "production"

/**
 * Ensure that there's only a single Prisma instance in dev. This is detailed here:
 * https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices
 */
declare global {
  // eslint-disable-next-line no-var
  var __globalPrisma__: PrismaClient
}

export let db: PrismaClient

if (IS_PROD) {
  db = new PrismaClient({
    // log: ["error", "warn", "query"],
  })
} else {
  if (!global.__globalPrisma__) {
    global.__globalPrisma__ = new PrismaClient({
      // log: ["error", "warn", "query"],
    })
  }

  db = global.__globalPrisma__
}
