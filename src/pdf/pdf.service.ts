import express from 'express'
import { extractTextFromPDFBuffer } from './pdfFile.service'
import { createEmbedding } from '../ai/embedding.service'
import { insertResourceSchema, resources } from '../db/schema/resources'
import { embeddings as embeddingsTable } from '../db/schema/embeddings'
import { db } from '..'

async function embedPdf(req: express.Request, res: express.Response) {
	const pdfFile = req.file
	const pdfBuffer = pdfFile?.buffer

	if (!pdfBuffer) {
		res.status(400).json({
			error: 'Bad Request',
			message: 'PDF file is missing or invalid',
		})
		return
	}

	const extractedText = await extractTextFromPDFBuffer(pdfBuffer)

	// Chunk by max token (overlapping characters to preserve meaning)
	const chunks = chunkTextBySentences(extractedText)

	// Store resource in database
	const { content } = insertResourceSchema.parse({ content: extractedText })
	const [resource] = await db.insert(resources).values({ content }).returning()

	// Create embeddings
	const embeddings = await createEmbedding(chunks)

	if (!embeddings) {
		res.status(500).json({
			error: 'Internal Server Error',
			message: 'Embeddings couldnt be generated',
		})
		return
	}

	// Store embeddings in database
	await db.insert(embeddingsTable).values(
		embeddings.map((embedding, i) => {
			if (!embedding?.values) {
				throw new Error(`Missing embedding at index ${i}`)
			}
			return {
				resourceId: resource.id,
				content: chunks[i],
				embedding: embedding.values,
			}
		})
	)

	res.status(200).json({
		success: true,
		message: 'Embedded successfully',
	})
}

function chunkTextBySentences(text: string, maxLength = 3000, overlap = 200) {
	const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
	const chunks = []

	let chunk = ''
	for (const sentence of sentences) {
		if ((chunk + sentence).length > maxLength) {
			chunks.push(chunk.trim())
			chunk = chunk.slice(-overlap)
		}
		chunk += sentence + ' '
	}

	if (chunk.trim()) {
		chunks.push(chunk.trim())
	}

	return chunks
}

export { embedPdf }
