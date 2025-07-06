import { cosineDistance, desc, gt, sql } from 'drizzle-orm'
import express from 'express'
import { createEmbedding } from '../ai/embedding.service'
import { embeddings } from '../db/schema/embeddings'
import { db } from '..'
import { getLlmResponse } from '../ai/groq.service'

async function handleQuery(req: express.Request, res: express.Response) {
	const userQuery = req.body.query

	// Convert query to embedding
	const userQueryEmbeddedArr = await createEmbedding([userQuery])

	const userQueryEmbedded = userQueryEmbeddedArr?.[0]?.values

	if (!userQueryEmbedded) {
		res.status(500).json({
			error: 'Internal Server Error',
			message: 'Query couldnt be embedded',
		})
		return
	}

	// Find similar vectors to query embedding
	const similarEmbeddings = await getSimilarEmbeddings(userQueryEmbedded)

	// Send embedding to llm
	const retrievedContext = similarEmbeddings?.map(embedding => embedding?.name)?.join('\n') || ''

	const llmResponse = await getLlmResponse(userQuery, retrievedContext)
	const llmAnswer = llmResponse?.choices?.[0]?.message

	// TODO: Stream response

	res.status(400).json({
		success: true,
		message: llmAnswer,
	})
}

async function getSimilarEmbeddings(userQueryEmbedded: number[]) {
	const similarity = sql<number>`1 - (${cosineDistance(embeddings.embedding, userQueryEmbedded)})`
	const similarGuides = await db
		.select({ name: embeddings.content, similarity })
		.from(embeddings)
		.where(gt(similarity, 0.5))
		.orderBy(t => desc(t.similarity))
		.limit(4)
	return similarGuides
}

export { handleQuery }
