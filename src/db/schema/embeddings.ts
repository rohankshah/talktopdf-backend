import { text, varchar, pgTable, vector, index } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'
import { resources } from './resources'

export const embeddings = pgTable(
	'embeddings',
	{
		id: varchar('id', { length: 191 })
			.primaryKey()
			.$defaultFn(() => nanoid()),
		resourceId: varchar('resource_id', { length: 191 }).references(() => resources.id, { onDelete: 'cascade' }),
		content: text('content').notNull(),
		embedding: vector('embedding', { dimensions: 768 }).notNull(),
	},
	table => [index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops'))]
)
