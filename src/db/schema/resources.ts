import { sql } from 'drizzle-orm'
import { text, varchar, timestamp, pgTable } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const resources = pgTable('resources', {
	id: varchar('id', { length: 191 })
		.primaryKey()
		.$defaultFn(() => nanoid()),
	content: text('content').notNull(),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	updatedAt: timestamp('updated_at')
		.notNull()
		.default(sql`now()`),
})
