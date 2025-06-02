import { eq } from 'drizzle-orm'
import { db } from './index.js'
import { raidsTable, usersTable } from './schema.js'
import { nanoid } from 'nanoid'
async function main() {
  const usersTest = await db.select().from(usersTable)
  const raidsTest = await db.select().from(raidsTable)
  console.log('Getting all users from the database: ', usersTest)
  console.log('Getting all raids', raidsTest)
  const user: typeof usersTable.$inferInsert = {
    name: 'sakneder',
    password: 'hello',
    email: 'sakneder@gmail.com',
  }
  const raid: typeof raidsTable.$inferInsert = {
    name: 'Onyxia raid',
    time: '00:00',
  }
  await db.insert(usersTable).values(user)
  console.log('New user created!')
  await db.insert(raidsTable).values(raid)
  const users = await db.select().from(usersTable)
  const raids = await db.select().from(raidsTable)
  console.log('Getting all users from the database: ', users)
  console.log('Getting all raids', raids)
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
