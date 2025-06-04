import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { characterTable, raidsTable, usersTable } from '@/db/schema'
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
export const getRaidsByUserId = cache(async (id: number) => {
  try {
    const results = db
      .select()
      .from(raidsTable)
      .where(eq(raidsTable.userId, id))
    return results || null
  } catch (err) {
    console.error('Error while fetching comps', err)
    return null
  }
})
export const getCharsByRaidId = cache(async (id: number) => {
  try {
    const results = db
      .select()
      .from(characterTable)
      .where(eq(characterTable.raidId, id))
    return results || null
  } catch (err) {
    console.error('Error while fetching comps', err)
    return null
  }
})
