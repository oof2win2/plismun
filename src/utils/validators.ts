/**
 * Zod validators for many data types
 */
import { z } from "zod"

export const committeeType = z.enum([
  "sc",
  "disec",
  "hrc",
  "unwomen",
  "arab",
  "who",
  "copuos",
  "paris",
  "icj",
])
export type committeeType = z.infer<typeof committeeType>

export const countryCode = z.string().regex(/^[A-Z]{2}$/)

// a single user that has registered. don't need to be a delegate or anything
export const User = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
  phone: z.string(),
  birthdate: z.date(),
  nationality: z.string(),
  gender: z.enum(["male", "female", "other"]).nullable(),
  schoolname: z.string(),
  position: z.enum(["admin", "chair", "delegate"]).nullable(),
  dietary: z.enum(["vegetarian", "vegan"]).nullable(),
  createdAt: z.date(),
  lastConference: z.date(),
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
  choice1committee: committeeType,
  choice1country: countryCode,
  choice2committee: committeeType,
  choice2country: countryCode,
  choice3committee: committeeType,
  choice3country: countryCode,
  experience: z.string(),
  motivation: z.string(),
  finalCommittee: committeeType,
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
  committeeType: committeeType,
  displayname: z.string(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  chair1: z.number().nullable(),
  chair2: z.number().nullable(),
  topic1: z.string(),
  topic2: z.string(),
  para1: z.string(),
  para2: z.string(),
})
export type CommiteeType = z.infer<typeof Committee>

export const CommiteeMember = z.object({
  committeeId: z.number(),
  userId: z.number(),
  countryCode: countryCode,
  displayname: z.string(),
  displayname2: z.string(),
})
export type CommiteeMemberType = z.infer<typeof CommiteeMember>
