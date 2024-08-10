import mongoose, { model, ObjectId } from "mongoose";

interface IImages extends mongoose.Document {
    images: Array<string>,

}

const imagesSchema = new mongoose.Schema<IImages>({
    images: {type: [String]},
}, {
    timestamps: { createdAt: true, updatedAt:true }
})

const ImagesModel = model<IImages>("image", imagesSchema)

export {
    IImages,
    ImagesModel
}


