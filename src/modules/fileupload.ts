import multer, { FileFilterCallback } from "multer";
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { extname } from "path";
import short from "short-uuid";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

export interface MulterFile {
    key: string; // Available using `S3`.
    path: string; // Available using `DiskStorage`.
    mimetype: string;
    originalname: string;
    size: number;
    destination: string;
    filename: string;
    length: number;
}

const createFolderWithDate = (folder: string) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // getMonth returns 0-11
    const day = new Date().getDate(); // getDate returns day of month
    const folderPath = path.join(__dirname, `./public/upload/${folder}/${year}/${month}/${day}/`);
    return folderPath;
};

const translator = short();

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        const folder = req.url.indexOf("course") > 0 ? "course" : "other";
        const folderPath = createFolderWithDate(folder);
        callback(null, folderPath);
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        const ext = extname(file.originalname).toLowerCase();
        const filename = translator.generate() + ext;
        callback(null, filename);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const ext = extname(file.originalname).toLowerCase();
    const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
};

const upload = multer({ storage, fileFilter });

export { upload };


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