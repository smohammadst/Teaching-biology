import mongoose, { model, Mongoose, ObjectId } from "mongoose";
import { ChapterModel, IChapter } from "src/modules/chapter/model/chapter.model";
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
    },
    related: Array<ObjectId>,
    chapters: Array<IChapter>
}



const courseSchema = new mongoose.Schema<ICourse>({
    title: {type:String},
    Description: {type: String},
    shortText: {type: String},
    price: {type: Number},
    discount: {type: Number},
    priceAfterDiscount: {type: Number},
    category: {type: [mongoose.Types.ObjectId], default: [], ref: "category"},
    images:{type: [String]},
    comments: { type: [], ref: "comment" },
    faq: {type: [FaqModel], default: []},
    neededTime: {
        hour: Number,
        minute: Number
    },
    chapters: {type: [ChapterModel], default: []},
    sortByNumber:{type: Number},
    language: {type: String},
    prerequisitesText: {type: String},
    prerequisites: {type: [mongoose.Types.ObjectId], default: []},
    owner: {
        name: String,
        image: String,
    },
    related: {type: [mongoose.Types.ObjectId], default: []}


})

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel
}