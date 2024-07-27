import { Request, Response, NextFunction } from "express";
import { ImageServices } from "./images.service";
import { ImagesDto } from "./dto/images.dto";
import { MulterFile } from "../fileupload";

class ImageController {
    //& { file: Express.Multer.File }
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let images: string[]
            const fileField: any = req.files
            // console.log("files : " + fileField);
            if (fileField.length > 0) images = fileField.map(file => file.destination.substr(8) + file.filename)
            // console.log(`controller: ${fileField}`);
            const result = await ImageServices.createImage(images)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export {
    ImageController
}

