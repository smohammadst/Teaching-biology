import { Model } from "mongoose";
import { IImages, ImagesModel } from "./model/images.model";


class ImageService {
    constructor(
        private imagesModel = ImagesModel<IImages>
    ) { }

    async createImage(images): Promise<object> {
        const urlImage = images.map(image => "https://teachingbiology.liara.run" + image)
        console.log(images);
        let result = await this.imagesModel.create({
            images,
            urlImage
        })
        return { message: "عکس با موفقیت اضافه شد" , urlImage}
    }
}

const ImageServices = new ImageService()

export {
    ImageServices
}