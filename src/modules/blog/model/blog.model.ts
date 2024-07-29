import mongoose, { ObjectId } from 'mongoose'

interface IBlog extends mongoose.Document {
    title: string,
    description: string,
    shortText: string,
    status: boolean,
    comments: Array<ObjectId>,
    category: Array<ObjectId>,
    images: Array<string>,
    shortLink: string,
    createdAt: string,
    related: Array<ObjectId>,
    latest: Array<ObjectId>,
    sortByNumber: number,
    view: number,
    like: ObjectId[],
    author: {name : string}
}

const blogSchema = new mongoose.Schema<IBlog>({
    title: { type: String },
    description: { type: String },
    shortText: { type: String },
    status: { type: Boolean },
    comments: { type: [mongoose.Types.ObjectId], ref: "comment", default: [] },
    category: { type: [mongoose.Types.ObjectId], ref: 'category' },
    images: { type: [String] },
    shortLink: { type: String },
    sortByNumber: { type: Number },
    createdAt: { type: String, default: '' },
    related: { type: [mongoose.Types.ObjectId], default: [] },
    latest: { type: [mongoose.Types.ObjectId] },
    view: { type: Number, default: 0 },
    like: { type: [mongoose.Types.ObjectId], ref: "user" },
    author: {type: Object, default: {}},

})

blogSchema.index({ title: "text", shortText: "text", category: "text" })

const BlogModel = mongoose.model<IBlog>("blog", blogSchema)

export {
    BlogModel,
    IBlog
}
