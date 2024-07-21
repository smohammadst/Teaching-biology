
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
    category: ObjectId,
    images: Array<string>,
    comments: Array<ObjectId>,
    neededTime: { hour: number, minute: number },
    sortByNumber: number,
    language: string,
    prerequisitesText: string,
    prerequisites: Array<ObjectId>,
    owner: {
        name: String,
        image: String,
    },
    related: Array<ObjectId>,
    chapters: IChapter[],
    typeCourse: string,
    sale: number    
}

const courseSchema = new mongoose.Schema<ICourse>({
    title: { type: String },
    Description: { type: String },
    shortText: { type: String },
    price: { type: Number },
    discount: { type: Number },
    priceAfterDiscount: { type: Number, default: 0 },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
    images: { type: [String] },
    comments: { type: [], ref: "comment" },
    neededTime: {
        hour: Number,
        minute: Number
    },
    chapters: { type: [chaptergSchema], default: [] },
    sortByNumber: { type: Number },
    language: { type: String },
    prerequisitesText: { type: String },
    prerequisites: { type: [mongoose.Types.ObjectId], default: [] },
    owner: {
        name: String,
        image: String,
    },
    related: { type: [mongoose.Types.ObjectId], default: [] },
    typeCourse: { type: String, default: '' },
    sale: { type: Number, default: 0 }

})

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel
}