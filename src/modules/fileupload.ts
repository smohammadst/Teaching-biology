import * as multer from "multer"

import path from 'path';
import {existsSync, mkdirSync} from 'fs';
import { extname, join } from "path";
const short = require("short-uuid")

const createHttpError = require("http-errors");
import { Request, Response, NextFunction } from "express";

export interface MulterFile {
    key: string // Available using `S3`.
    path: string // Available using `DiskStorage`.
    mimetype: string
    originalname: string
    size: number
    destination: string
    filename: string
    length: number
}


const createFolderWithDate = (folder: string) => {
    const year = new Date().getFullYear
    const month = new Date().getMonth
    const day = new Date().getDay;
    return `./public/upload/${folder}/${year}/${month}/${day}/`;
}
const translator = short()

const storage = multer.diskStorage({
    destination: (req: Request, file: MulterFile, callback: CallableFunction) => {
        const folder = req.url.indexOf("course") > 0 ? "course" : "other"
        const path = createFolderWithDate(folder)
        if (!existsSync(path)) {
            mkdirSync(path, { recursive: true })
        }
        callback(null, path)
    },
    filename: (req: Request, file: MulterFile, callback: CallableFunction) => {
        //const ext = path.extname(file.originalname)
        const ext = extname(file.originalname).toLowerCase();
        const filename = String(translator.generate()) + ext;
        //const filename = ''  +ext

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

const upload = multer({ storage });

export {
    upload
}

/********************** */
// const multer = require("multer")
// import { Request } from "express";
// import { extname, join } from "path";
// import { mkdirSync } from "fs";
// import { error } from "console";
// import { diskStorage } from "multer";
// export type DestinationCallback = (error: Error | null, destination: string | null) => void;
// export type FileNameCallback = (error: Error | null, filename: string | null) => void;
// export interface MulterFile {
//     key: string // Available using `S3`.
//     path: string // Available using `DiskStorage`.
//     mimetype: string
//     originalname: string
//     size: number
//     destination: string
//     filename: string
// }

// export function multerDestination(fieldName: string) {
//     return function (req: Request, file: MulterFile, callback: DestinationCallback): void {
//         let path = join("public", "uploads", fieldName);
//         mkdirSync(path, { recursive: true });
//         callback(null, path)
//     }
// }
// export function multerFilename(req: Request, file: MulterFile, callback: FileNameCallback): void {
//     const ext = extname(file.originalname).toLowerCase();
//     if (!isValidImageFormat(ext)) {
//         callback(new error, null)
//     } else {
//         const filename = `${Date.now()}${ext}`
//         callback(null, filename)
//     }
// }
// function isValidImageFormat(ext: string) {
//     return [".png", ".jpg", ".jpeg"].includes(ext)
// }

// export function multerStorage(folderName: string) {
//     return diskStorage({
//         destination: multerDestination(folderName),
//         filename: multerFilename
//     })
// }

// const upload = multer({ multerDestination });
// export{
//     upload
// }