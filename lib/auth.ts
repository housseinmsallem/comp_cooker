import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { hash } from 'crypto'

export const hashpassword = (password: string) => {
  return hash('bcrypt', password)
}
export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = hashpassword(password)
  try {
    await db
      .insert(usersTable)
      .values({ name, email, password: hashedPassword })
    return { name, email }
  } catch (err) {
    console.error('Failed to create User', err)
    return {
      success: null,
    }
  }
}
