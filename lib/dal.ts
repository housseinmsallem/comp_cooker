import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { characterTable, raidsTable, usersTable } from '@/db/schema'
import { cache } from 'react'
import { getSession } from './auth'

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
export const getRaidsByUserId = async () => {
  try {
    const session = await getSession()
    if (!session) {
      return null
    }
    const results = await db.query.raidsTable.findMany({
      where: (raids, { eq }) => eq(raids.userId, Number(session.userId)),
    })

    return results
  } catch (err) {
    console.error('Error while fetching comps', err)
    return null
  }
}
export const getCharsByRaidId = async (id: number) => {
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
}
