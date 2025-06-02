import {
  integer,
  pgTable,
  serial,
  text,
  time,
  varchar,
} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  raidId: integer().references(() => raidsTable.id),
})

export const raidsTable = pgTable('raids', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  time: time(),
})
