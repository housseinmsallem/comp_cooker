import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { cache } from 'react'

export const getUserByEmail = cache(async (email: string) => {
  try {
    const result = db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
    return result || null
  } catch (err) {
    console.error('Error while fetching user', err)
    return null
  }
})
