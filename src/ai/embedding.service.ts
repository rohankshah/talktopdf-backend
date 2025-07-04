import { GoogleGenAI } from '@google/genai'

export const embeddingService = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

async function createEmbedding(content: string) {
	const response = await embeddingService.models.embedContent({
		model: 'text-embedding-004',
		contents: content,
	})
	return response.embeddings
}

export { createEmbedding }
