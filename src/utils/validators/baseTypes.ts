/**
 * Zod validators for many data types
 */
import { z } from "zod"
import validator from "validator"

export const countryCode = z.string().regex(/^[A-Z]{2}$/)

// a single user that has registered. don't need to be a delegate or anything
export const User = z.object({
  id: z.number(),
  email: z.string().email(),
  password: z.string(),

  isStaff: z.boolean().default(false),

  firstname: z.string(),
  lastname: z.string(),

  phone: z.string().nullable(),
  birthdate: z.union([
    z
      .string()
      .refine((x) => validator.isISO8601(x), "Invalid date provided")
      .transform((x) => new Date(x)),
    z.date(),
  ]),
  nationality: z.string(),
  position: z.string().nullable(),
  dietary: z.string().nullable(),

  otherInfo: z.string().nullable(),
  userLink: z.string().nullable(),

  createdAt: z.union([
    z
      .string()
      .refine((x) => validator.isISO8601(x), "Invalid date provided")
      .transform((x) => new Date(x)),
    z.date(),
  ]),
})
export type UserType = z.infer<typeof User>

// a single delegate is a user that has signed up for PLISMUN this year
export const Delegate = z.object({
  // the ID of the delegate
  delegateId: z.number(),
  // the ID of the user that is the delegate
  userId: z.number(),
  // name of the delegation they are participating in
  delegation: z.string(),
  choice1committee: z.string(),
  choice1country: countryCode,
  choice2committee: z.string(),
  choice2country: countryCode,
  choice3committee: z.string(),
  choice3country: countryCode,
  experience: z.string(),
  motivation: z.string(),
  finalCommittee: z.string(),
  finalCountry: countryCode,
  paymentStatus: z.enum(["pending", "paid", "rejected"]),
})
export type DelegateType = z.infer<typeof Delegate>

// a delegation is a group of delegates that often come from one school
export const Delegation = z.object({
  delegationId: z.number(),
  name: z.string(),
  userId: z.string(),
  country: countryCode,
  estimatedDelegates: z.number(),
  delegates: z.number().nullable(),
})
export type DelegationType = z.infer<typeof Delegation>

export const Committee = z.object({
  id: z.number(),
  displayname: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  hasChairs: z.boolean(),
  topic1: z.string().nullable(),
  topic2: z.string().nullable(),
  para1: z.string().nullable(),
  para2: z.string().nullable(),
  dataFolder: z.string().nullable(),
  presentedBy: z.string().nullable(),
})
export type CommiteeType = z.infer<typeof Committee>

export const CommiteeMember = z.object({
  committeeId: z.number(),
  userId: z.number(),
  country: z.string(),
})
export type CommiteeMemberType = z.infer<typeof CommiteeMember>
