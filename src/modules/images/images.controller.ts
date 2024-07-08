import { Request, Response, NextFunction } from "express";

import { ImageServices } from "./images.service";
import { ImagesDto } from "./dto/images.dto";



class ImageController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {

            let images: ImagesDto = req.body;
            const fileField = req?.file || undefined
            if (fileField.length > 0) images = fileField.map(file => file.destination.substr(8) + file.filename)
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