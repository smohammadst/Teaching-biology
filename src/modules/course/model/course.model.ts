
import mongoose, { model, ObjectId } from 'mongoose'

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
    rating: {
        rate: number,
        count: number
    }
}

const courseSchema = new mongoose.Schema<ICourse>({
    title: { type: String },
    Description: { type: String },
    shortText: { type: String },
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
    rating: { type: Object, default: {} },

})
courseSchema.index({ title: "text", shortText: "text", category: "text" })

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel,
}