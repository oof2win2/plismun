import { z } from "zod"
import validator from "validator"

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

export const DelegateApply = z.object({
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

  choice1committee: z.number().min(0, "Please choose a committee"),
  choice1country: z.string().min(2, "Please choose a country"),
  choice2committee: z.number().min(0, "Please choose a committee"),
  choice2country: z.string().min(2, "Please choose a country"),
  choice3committee: z.number().min(0, "Please choose a committee"),
  choice3country: z.string().min(2, "Please choose a country"),
})
export type DelegateApply = z.infer<typeof DelegateApply>
