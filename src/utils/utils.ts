import { SafeParseReturnType, ZodType, ZodTypeAny, z } from "zod"

export function randomElementFromList<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)]
}

/**
 * Get a SafeParseReturnType from zod and then transfer it to an object of fieldname:string so that formik can parse the errors
 */
export function zodErrorToFormik<
  I extends Record<string, any>,
  O extends Record<string, any>
>(data: SafeParseReturnType<I, O>): Partial<Record<keyof O, string>> {
  if (data.success) return {}

  const errors = data.error.flatten().fieldErrors as Partial<
    Record<keyof O, string[]>
  >

  const newErrors = {}
  for (const [field, error] of Object.entries(errors)) {
    // @ts-expect-error
    newErrors[field] = error[0]
  }
  return newErrors
}
