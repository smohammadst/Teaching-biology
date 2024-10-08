
import mongoose, { model, ObjectId } from 'mongoose'

interface ICodeDisCount extends mongoose.Document {
    code: string,
    discount: string
}

const codeSchema = new mongoose.Schema<ICodeDisCount>({
    code: { type: String, required: true, unique: true, trim: true },
    discount: { type: String, required: true }
}, {
    timestamps: { createdAt: true, updatedAt:true }
})

// Episode

interface IEpisode extends mongoose.Document {
    title: string,
    time: {
        min: number,
        second: number
    }

}

const episodeSchema = new mongoose.Schema<IEpisode>({
    title: { type: String },
    time: { type: Object },
}, {
    timestamps: { createdAt: true, updatedAt:true }
})

// Chapter

interface IChapter extends mongoose.Document {
    title: string,
    text: string,
    time: { hour: number, min: number },
    episodes: Array<IEpisode>

}

const chaptergSchema = new mongoose.Schema<IChapter>({
    title: { type: String },
    text: { type: String },
    time: { type: Object },
    episodes: { type: [episodeSchema], default: [] }

}, {
    timestamps: { createdAt: true }
})


// Course

interface ICourse extends mongoose.Document {
    title: string,
    Description: string,
    shortText: string,
    price: number,
    discount: number,
    priceAfterDiscount: number,
    category: Array<string>,
    images: Array<string>,
    comments: Array<ObjectId>,
    neededTime: { hour: number, minute: number },
    createdAt: string,
    sortByNumber: number,
    language: string,
    prerequisitesText: string,
    prerequisites: Array<Object>,
    owner: {
        name: string,
        image: string,
    },
    related: Array<ObjectId>,
    latest: Array<ObjectId>,
    chapters: IChapter[],
    level: string,
    type: string,
    sale: number,
    view: number,
    like: ObjectId[],
    numberLike: number,
    rating: {
        rate: number,
        count: number
    },
    faq: Array<ObjectId>
}

const courseSchema = new mongoose.Schema<ICourse>({
    title: { type: String, default: '' },
    Description: { type: String, default: '' },
    shortText: { type: String, default: '' },
    price: { type: Number },
    discount: { type: Number },
    priceAfterDiscount: { type: Number, default: 0 },
    category: { type: [String], ref: "category" },
    images: { type: [String] },
    comments: { type: [], ref: "comment" },
    neededTime: { type: Object, default: {} },
    createdAt: { type: String, default: '' },
    chapters: { type: [chaptergSchema], default: [] },
    sortByNumber: { type: Number },
    language: { type: String },
    prerequisitesText: { type: String },
    prerequisites: { type: [Object], default: [] },
    owner: { type: Object, default: {} },
    related: { type: [Object], default: [] },
    latest: { type: [mongoose.Types.ObjectId], default: [] },
    level: { type: String, default: '' },
    type: { type: String, default: '' },
    sale: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    like: { type: [mongoose.Types.ObjectId], ref: "user" },
    numberLike: { type: Number, default: 0 },
    rating: { type: Object, default: {} },
    faq: { type: [mongoose.Types.ObjectId], ref: 'faq', default: [] }

}, {
    timestamps: { createdAt: true, updatedAt:true }
})
courseSchema.index({ title: "text", shortText: "text", category: "text" })

const CourseModel = model<ICourse>("course", courseSchema)
const CodeDiscountModel = model<ICodeDisCount>("codeDiscount", codeSchema)
export {
    ICourse,
    CourseModel,
    CodeDiscountModel,
    ICodeDisCount
}