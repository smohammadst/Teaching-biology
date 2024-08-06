import { Model } from "mongoose";
import { IImages, ImagesModel } from "./model/images.model";
import createHttpError from "http-errors";


class ImageService {
    constructor(
        private imagesModel = ImagesModel<IImages>
    ) { }

    async createImage(images): Promise<object> {
        console.log(images);
        const urlImage = images.map(image => "https://teachingbiology.liara.run" + image)
        let result = await this.imagesModel.create({
            images,
            urlImage
        })
        return { message: "عکس با موفقیت اضافه شد", urlImage }
    }

    async getAll() {
        return await this.imagesModel.find({})
    }

    async remove(id: string) {
        const result = await this.imagesModel.deleteOne({ _id: id })
        if (result.deletedCount == 0) throw createHttpError.NotFound("عکسی یافت نشد")
        return { message: "عکس با موفقیت حذف گردید" }
    }
}

const ImageServices = new ImageService()

export {
    ImageServices
}