import express from 'express'
import { uploadMiddleware } from '../middlewares/upload'
import { handleQuery } from './chat.service'

const chatRouter = express.Router()

chatRouter.post('/', uploadMiddleware, handleQuery)

export default chatRouter
