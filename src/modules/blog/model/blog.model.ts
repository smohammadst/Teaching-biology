import mongoose,  { ObjectId } from 'mongoose'

interface IBlog extends mongoose.Document{
    title:string,
    description:string,
    shortText:string,
    status:boolean,
    comments: Array<ObjectId>,
    category: Array<ObjectId>,
    images: Array<string>,
    shortLink: string,
}

const blogSchema = new mongoose.Schema<IBlog>({
    title: {type: String},
    description: {type: String},
    shortText : {type: String},
    status: {type: Boolean},
    comments: {type: [mongoose.Types.ObjectId] , ref:"comment"},
    category: {type: [mongoose.Types.ObjectId]},
    images: {type: [String]},
    shortLink: {type: String},
})

const BlogModel = mongoose.model<IBlog>("blog", blogSchema)

export{
    BlogModel,
    IBlog
}
