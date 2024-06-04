import mongoose,  { ObjectId } from 'mongoose'

interface IBlog extends mongoose.Document{
    title:string,
    text:string,
    shortText:string,
    status:boolean,
    comment: Array<ObjectId>,
    category: Array<ObjectId>,
    images: Array<string>,
    shortLink: string,
}

const blogSchema = new mongoose.Schema<IBlog>({
    title: {type: String},
    text: {type: String},
    shortText : {type: String},
    status: {type: Boolean},
    comment: {type: [mongoose.Types.ObjectId]},
    category: {type: [mongoose.Types.ObjectId]},
    images: {type: [String]},
    shortLink: {type: String},
})

const BlogModel = mongoose.model<IBlog>("blog", blogSchema)

export{
    BlogModel,
    IBlog
}
