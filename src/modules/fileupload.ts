import * as multer from "multer";
import * as path from 'path';
import { extname } from "path";
import { v4 as uuid } from "uuid"
import { Request } from "express";
import { mkdirSync } from "fs"

export interface MulterFile {
    title: string
}

const createFolderWithDate = (folder: string) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1; // getMonth returns 0-11
    const day = new Date().getDate(); // getDate returns day of month
    const folderPath = path.join(__dirname, '..', '..', 'public', 'uploads', folder, `${year}`, `${month}`, `${day}`);
    mkdirSync(folderPath, { recursive: true });
    return folderPath;
};

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) => {
        const folder = req.url.includes("course") ? "course" : "other";
        const folderPath = createFolderWithDate(folder);
        console.log(folderPath);
        callback(null, folderPath);
    },
    filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) => {
        const ext = extname(file.originalname).toLowerCase();
        const name = Date.now()
        const filename = `${name}${ext}`;
        callback(null, filename);
    }
});

// const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
//     const ext = extname(file.originalname).toLowerCase();
//     const mimetypes = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".jfif"];
//     if (mimetypes.includes(ext)) {
//         return cb(null, true);
//     }
//     return cb(createHttpError.BadRequest("فرمت ارسال شده تصویر صحیح نمیباشد"));
// };

const upload = multer({ storage });

export { upload };


