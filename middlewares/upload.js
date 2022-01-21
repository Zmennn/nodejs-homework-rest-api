import multer from "multer";
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now().toString()}_${file.originalname}`)
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes('image')) {
            return cb(null, true)
        }
        cb(new Error('Wrong file type'))
    }
})