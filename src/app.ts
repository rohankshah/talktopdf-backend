import express from 'express'
import cors from 'cors'
import pdfRouter from './pdf/pdf.controller'
import chatRouter from './chat/chat.controller'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/pdf', pdfRouter)
app.use('/api/chat', chatRouter)

export default app
