import multer from 'multer'

export const upload = multer()

// export const uploadMiddleware = upload.fields([{ name: 'uploaded_file', maxCount: 1 }])
export const uploadMiddleware = upload.single('uploaded_file')
