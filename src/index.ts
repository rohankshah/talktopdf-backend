import dotenv from 'dotenv'
dotenv.config()

import app from './app'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
})

export const db = drizzle({ client: pool })

const PORT = process.env.PORT || 3001

async function startServer() {
	try {
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	} catch (error) {
		console.error('Failed to start server:', error)
		process.exit(1)
	}
}

startServer()
