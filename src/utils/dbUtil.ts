import bcrypt from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * Hash a password with 10 rounds of bcrypt
 * @param password Unhashed password
 * @returns Hashed password
 */
export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

/**
 * Compare a password with a hashed password and return true if they are identical
 * @param password Clear text password
 * @param hashedPassword Existing hashed password
 * @returns Whether the two passwords are identical
 */
export function checkPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
