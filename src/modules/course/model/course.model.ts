import mongoose, { model, ObjectId } from "mongoose";
import { FaqModel, IFAQ } from "src/modules/FAQ/model/faq.model";

interface ICourse extends mongoose.Document {
    title:string,
    text:string,
    shortText:string,
    price: number,
    discount: number,
    finalPrice: number,
    category: Array<ObjectId>,
    images: Array<string>,
    comments: Array<ObjectId>,
    faq: Array<IFAQ>
}


const courseSchema = new mongoose.Schema<ICourse>({
    title: {type:String},
    text: {type: String},
    shortText: {type: String},
    price: {type: Number},
    discount: {type: Number},
    finalPrice: {type: Number},
    category: {type: [mongoose.Types.ObjectId]},
    images:{type: [String]},
    comments: { type: [mongoose.Types.ObjectId], ref: "comment" },
    faq: {type: [FaqModel]},
})

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel
}