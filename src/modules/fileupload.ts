import * as multer from "multer";
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import { extname } from "path";
const  short = require('short-uuid');
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

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const ext = extname(file.originalname).toLowerCase();
    const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
    if (mimetypes.includes(ext)) {
        return cb(null, true);
    }
    return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
};

const upload = multer({ storage, fileFilter });

export { upload };


