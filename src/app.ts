import express from 'express'
import cors from 'cors'
import pdfRouter from './pdf/pdf.controller'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/pdf', pdfRouter)

export default app
