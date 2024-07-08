import { Model } from "mongoose";
import { IImages } from "./model/images.model";
import { ImagesDto } from "./dto/images.dto";
const createError = require("http-errors");

class ImageService {
    constructor(
        private imagesModel = Model<IImages>
    ) { }

    async createImage(image: ImagesDto): Promise<object>{
        
        let result = await this.imagesModel.create({
            images: image.images
        })
        return { status: 201, message: "عکس با موفقیت اضافه شد" }
    }
    


}

const ImageServices = new ImageService()

export {
    ImageServices
}