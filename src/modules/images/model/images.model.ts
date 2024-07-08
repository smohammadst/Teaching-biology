import mongoose, { model, ObjectId } from "mongoose";

interface IImages extends mongoose.Document {
    images: Array<string>,

}

const imagesSchema = new mongoose.Schema<IImages>({
    images: {type: [String]},
})

const ImagesModel = model<IImages>("faq", imagesSchema)

export {
    IImages,
    ImagesModel
}


