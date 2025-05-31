import { integer, pgTable, serial, time, varchar } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  raidId: integer().references(() => raidsTable.id),
})

export const raidsTable = pgTable('raids', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  time: time(),
})
