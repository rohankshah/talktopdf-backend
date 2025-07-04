import express from 'express'
import { embedPdf } from './pdf.service'
import { uploadMiddleware } from '../middlewares/upload'

const pdfRouter = express.Router()

pdfRouter.post('/embed', uploadMiddleware, embedPdf)

export default pdfRouter
