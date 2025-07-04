import express from 'express'
import { extractTextFromPDFBuffer } from './pdfFile.service'

export const embedPdf = async (req: express.Request, res: express.Response) => {
	const pdfFile = req.file
	const pdfBuffer = pdfFile?.buffer

	if (!pdfBuffer) {
		res.status(400).json({
			error: 'BadRequest',
			message: 'PDF file is missing or invalid',
		})
		return
	}

	const extractedText = await extractTextFromPDFBuffer(pdfBuffer)

	// Chunk by max token (overlapping characters to preserve meaning)
	const chunks = chunkTextBySentences(extractedText)

	// Create embeddings

	// Store in database

	res.status(400).json({
		success: true,
		message: 'Embedded successfully',
	})
}

function chunkTextBySentences(text: string, maxLength = 3000, overlap = 200) {
	const sentences = text.match(/[^.!?]+[.!?]+/g) || [text] // fallback if no punctuation
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
