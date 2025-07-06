import Groq from 'groq-sdk'

const client = new Groq({
	apiKey: process.env.GROQ_API_KEY,
})

const initialPrompt = `You are an AI assistant designed to help users understand and extract information from PDF documents using Retrieval-Augmented Generation (RAG). You do not have direct access to the entire document, but you are provided with relevant excerpts retrieved from it.

Always answer using only the provided context, and if the context does not contain enough information to answer confidently, respond with a polite disclaimer. Keep your answers clear, helpful, and grounded in the retrieved content.

Format your responses for readability. Where appropriate, use bullet points, numbered steps, or markdown formatting to make the information easier to follow.

If the user asks for summaries, definitions, comparisons, or explanations, generate concise and helpful replies using only the provided content.
`

async function getLlmResponse(query: string, context: string) {
	const chatCompletion: Groq.Chat.ChatCompletion = await client.chat.completions.create({
		messages: [
			{ role: 'system', content: initialPrompt },
			{ role: 'user', content: `${context} Query: ${query}` },
		],
		model: 'llama3-8b-8192',
	})

	return chatCompletion
}

export { getLlmResponse }
