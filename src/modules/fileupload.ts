import { File } from "buffer";

const multer = require("multer")
const moment = require("moment-jalaali")
const fs = require("fs")
const path = require("path")
const short = require('short-uuid');
const createHttpError = require("http-errors");

const createFolderWithDate = (folder: string) => {
    const year = moment().jYear();
    const month = moment().jMonth();
    const day = moment().jDate();
    return `./public/upload/${folder}/${year}/${month}/${day}/`;
}
const translator = short()
const storage = multer.diskStorage({
    destination: (req: Request, file: File, callback: CallableFunction) => {
        const folder = req.url.indexOf("course") > 0 ? "course" : "other"
        const path = createFolderWithDate(folder)
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        callback(null, path)
    },
    filename: (req: Request, file: File, callback: CallableFunction) => {
        const ext = path.extname(file.name)
        const filename = String(translator.generate()) + ext;
        callback(null, filename)

    }
})

function fileFilter(req: Request, file: File, cb: CallableFunction) {
    const ext = path.extname(file.name);
    const mimetypes = [".jpg",".JPG", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
}

const upload = multer({ storage, fileFilter });

export {
    upload
}