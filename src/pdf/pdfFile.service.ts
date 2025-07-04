import { PdfReader } from 'pdfreader'

function extractTextFromPDFBuffer(dataBuffer: Buffer): Promise<string> {
	return new Promise((resolve, reject) => {
		const pdfReader = new PdfReader()

		let extractedText = ''

		pdfReader.parseBuffer(dataBuffer, (err, data) => {
			if (err) {
				return reject(err)
			}

			if (!data) {
				resolve(extractedText)
			}

			extractedText += data?.text
		})
	})
}

export { extractTextFromPDFBuffer }
