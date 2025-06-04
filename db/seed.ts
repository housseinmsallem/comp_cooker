import { eq } from 'drizzle-orm'
import { db } from './index.js'
import { characterTable, raidsTable, usersTable } from './schema.js'
import { nanoid } from 'nanoid'
async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'sakneder',
    password: 'hello',
    email: 'sakneder@gmail.com',
  }
  const raid: typeof raidsTable.$inferInsert = {
    name: 'Onyxia raid',
    game: 'Albion Online',
  }
  const char: typeof characterTable.$inferInsert = {
    name: 'HallowFall',
    description: 'Heal frontline',
    role: 'Healer',
    tier: 'Tier S',
    raidId: 1,
  }
  await db.delete(usersTable)
  await db.delete(raidsTable)
  await db.delete(characterTable)
  await db.insert(usersTable).values(user)
  console.log('New user created!')
  await db.insert(raidsTable).values(raid)
  console.log('New raid created!')
  await db.insert(characterTable).values(char)
  console.log('New Char created!')
  const users = await db.select().from(usersTable)
  const raids = await db.select().from(raidsTable)
  const chars = await db.select().from(characterTable)
  console.log('Getting all users from the database: ', users)
  console.log('Getting all raids', raids)
  console.log('Getting all characters', chars)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      name: 'hpoico',
    })
    .where(eq(usersTable.email, user.email))
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email))
  console.log('User deleted!')
}

main()
