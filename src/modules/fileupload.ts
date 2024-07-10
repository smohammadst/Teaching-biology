import { File } from "buffer";

const multer = require("multer")
const moment = require("moment-jalaali")
const fs = require("fs")
const path = require("path")
const short = require('short-uuid');
const createHttpError = require("http-errors");

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
    destination: string
    filename: string
}

const createFolderWithDate = (folder: string) => {
    const year = moment().jYear();
    const month = moment().jMonth();
    const day = moment().jDate();
    return `./public/upload/${folder}/${year}/${month}/${day}/`;
}
const translator = short()
const storage = multer.diskStorage({
    destination: (req: Request, file: MulterFile, callback: CallableFunction) => {
        const folder = req.url.indexOf("course") > 0 ? "course" : "other"
        const path = createFolderWithDate(folder)
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        callback(null, path)
    },
    filename: (req: Request, file: MulterFile, callback: CallableFunction) => {
        const ext = path.extname(file.originalname)
        const filename = String(translator.generate()) + ext;
        callback(null, filename)

    }
})

function fileFilter(req: Request, file: MulterFile, cb: CallableFunction) {
    const ext = path.extname(file.originalname);
    const mimetypes = [".jpg", ".JPG", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const upload = multer({ storage, fileFilter });

export {
    upload
}