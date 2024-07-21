import { Model } from "mongoose";
import { IImages } from "./model/images.model";


class ImageService {
    constructor(
        private imagesModel = Model<IImages>
    ) { }

    async createImage(image: string[]): Promise<object>{
        
        let result = await this.imagesModel.create({
            images: image
        })
        return { status: 201, message: "عکس با موفقیت اضافه شد" }
    }
}

const ImageServices = new ImageService()

export {
    ImageServices
}