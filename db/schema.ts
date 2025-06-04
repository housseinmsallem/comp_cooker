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
})

export const raidsTable = pgTable('raids', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  game: varchar({ length: 255 }).notNull(),
  userId: integer().references(() => usersTable.id),
})
export const characterTable = pgTable('characters', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }),
  role: varchar({ length: 255 }),
  tier: varchar({ length: 255 }),
  raidId: integer().references(() => raidsTable.id),
})
