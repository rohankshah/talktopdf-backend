import { Request, Response, NextFunction } from 'express'
import multer from 'multer'

export const upload = multer().single('uploaded_file')

export const uploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
	upload(req, res, (err: any) => {
		if (err instanceof multer.MulterError) {
			return res.status(400).json({
				error: 'Upload Error',
				message: err.message,
			})
		} else if (err) {
			return res.status(500).json({
				error: 'Unexpected Error',
				message: err.message || 'Unexpected error during file upload',
			})
		}
		next()
	})
}
