import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {

            if (file.fieldname === 'document') {
                cb(null, 'uploads/documents/')
            }
            else if (file.fieldname === 'img') {
                cb(null, 'uploads/images/')
            }
        },
        filename: (req, file, cb) => {
            console.log(file);

            cb(null, uuidv4() + path.extname(file.originalname))
        }
    }
)

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'document') {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Allowed only pdf files!'), false);
        }
    }
    else if (file.fieldname === 'img') {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Allowed only image files!'), false);
        }
    }
}

const upload = multer(
    {
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
    }
)

const uploadFiles = upload.fields(
    [
        {
            name: "document",
            maxCount: 1,
        },
        {
            name: "img",
            maxCount: 1
        }
    ]

)

export default uploadFiles