import { z } from "zod"
import validator from "validator"
import { Committee, CommitteeCountries } from "@prisma/client"

export const DietaryOptions = z.enum([
  "None",
  "Vegetarian",
  "Vegan",
  "Other (please specify below)",
])

export const SignupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordConfirm: z.string(),

    firstname: z.string().min(1, "Please enter first name"),
    lastname: z.string().min(1, "Please enter last name"),

    phone: z
      .string()
      .nullable()
      // validate if it is a mobile phone number if present
      .refine(
        (phone) => (phone ? validator.isMobilePhone(phone) : true),
        "Invalid phone number"
      )
      .transform((phone) => phone || null),
    birthdate: z.union([
      z
        .string()
        .default(() => new Date().toISOString())
        .transform((x) => new Date(x)),
      z.date(),
    ]),
    nationality: z.string().refine((nat) => validator.isISO31661Alpha2(nat)),
    schoolname: z.string().nullable(),
    dietary: DietaryOptions.nullable(),
    otherInfo: z.string().max(400).nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      })
    }
    return ctx
  })
export type SignupSchemaType = z.infer<typeof SignupSchema>

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const DelegateApply = z
  .object({
    userId: z.number(),

    motivation: z
      .string()
      .max(4000, "Your motivation is too long")
      .min(10, "Please enter a short motivation"),
    experience: z
      .string()
      .max(4000, "Your experience is too long")
      .min(10, "Please enter a short experience"),

    // ID of delegation
    // -1 is taken as no delegation
    delegationId: z.preprocess(
      (val) => (val === -1 ? null : val),
      z.number().nullable()
    ),

    // choices
    choice1committee: z
      .number({ invalid_type_error: "Please choose a committee" })
      .min(0, "Please choose a committee"),
    choice1country: z.string().min(2, "Please choose a country"),
    choice2committee: z
      .number({ invalid_type_error: "Please choose a committee" })
      .min(0, "Please choose a committee"),
    choice2country: z.string().min(2, "Please choose a country"),
    choice3committee: z
      .number({ invalid_type_error: "Please choose a committee" })
      .min(0, "Please choose a committee"),
    choice3country: z.string().min(2, "Please choose a country"),

    // shirt size or null if no shirt desired
    shirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"]).nullable(),
  })
  .superRefine(async (body, ctx) => {
    let committees: Committee[]
    let committeeCountries: CommitteeCountries[]

    // TODO: implement some form of caching here as these fetches are fairly useless
    if (typeof window !== "undefined") {
      committees = await fetch("/api/committees")
        .then((res) => res.json())
        .then((json) => json.data)
      committeeCountries = await fetch("/api/committees/countries")
        .then((res) => res.json())
        .then((json) => json.data)
    } else {
      const { db } = await import("@/utils/db")
      committees = await db.committee.findMany()
      committeeCountries = await db.committeeCountries.findMany()
    }

    const committee1valid = committees.find(
      (c) => c.id === body.choice1committee
    )
    if (!committee1valid) {
      ctx.addIssue({
        code: "invalid_enum_value",
        options: committees.map((c) => c.id),
        path: ["choice1committee"],
        message: "The committee with the given ID was not found",
      })
    }
    const committee2valid = committees.find(
      (c) => c.id === body.choice2committee
    )
    if (!committee2valid) {
      ctx.addIssue({
        code: "invalid_enum_value",
        options: committees.map((c) => c.id),
        path: ["choice2committee"],
        message: "The committee with the given ID was not found",
      })
    }
    const committee3valid = committees.find(
      (c) => c.id === body.choice3committee
    )
    if (!committee3valid) {
      ctx.addIssue({
        code: "invalid_enum_value",
        options: committees.map((c) => c.id),
        path: ["choice2committee"],
        message: "The committee with the given ID was not found",
      })
    }

    // check if each choice's country is valid in it's committee
    const choice1valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice1committee &&
        c.country === body.choice1country
    )
    if (!choice1valid && committee1valid)
      ctx.addIssue({
        code: "invalid_enum_value",
        path: ["choice2country"],
        message: "Invalid country and committee combination",
        options: committeeCountries
          .filter((c) => c.committeeId === body.choice1committee)
          .map((c) => c.country),
      })

    const choice2valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice2committee &&
        c.country === body.choice2country
    )
    if (!choice2valid && committee2valid)
      ctx.addIssue({
        code: "invalid_enum_value",
        path: ["choice3country"],
        message: "Invalid country and committee combination",
        options: committeeCountries
          .filter((c) => c.committeeId === body.choice2committee)
          .map((c) => c.country),
      })

    const choice3valid = committeeCountries.find(
      (c) =>
        c.committeeId === body.choice3committee &&
        c.country === body.choice3country
    )
    if (!choice3valid && committee3valid)
      ctx.addIssue({
        code: "invalid_enum_value",
        path: ["choice3country"],
        message: "Invalid country and committee combination",
        options: committeeCountries
          .filter((c) => c.committeeId === body.choice3committee)
          .map((c) => c.country),
      })
  })
export type DelegateApply = z.infer<typeof DelegateApply>
