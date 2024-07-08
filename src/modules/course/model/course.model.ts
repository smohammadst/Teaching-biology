import mongoose, { model, ObjectId } from "mongoose";
import { FaqModel, IFAQ } from "src/modules/FAQ/model/faq.model";

interface ICourse extends mongoose.Document {
    title:string,
    Description:string,
    shortText:string,
    price: number,
    discount: number,
    priceAfterDiscount: number,
    category: Array<ObjectId>,
    images: Array<string>,
    comments: Array<ObjectId>,
    faq: Array<IFAQ>,
    neededTime:{hour: number, minute: number},
    sortByNumber: number,
    language: string,
    prerequisitesText: string,
    prerequisites: Array<ObjectId>,
    owner: {
        name: String,
        image: String,
    }
}



const courseSchema = new mongoose.Schema<ICourse>({
    title: {type:String},
    Description: {type: String},
    shortText: {type: String},
    price: {type: Number},
    discount: {type: Number},
    priceAfterDiscount: {type: Number},
    category: {type: [mongoose.Types.ObjectId]},
    images:{type: [String]},
    comments: { type: [mongoose.Types.ObjectId], ref: "comment" },
    faq: {type: [FaqModel]},
    neededTime: {
        hour: Number,
        minute: Number
    },
    sortByNumber:{type: Number},
    language: {type: String},
    prerequisitesText: {type: String},
    prerequisites: {type: [mongoose.Types.ObjectId]},
    owner: {
        name: String,
        image: String,
    }


})

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel
}