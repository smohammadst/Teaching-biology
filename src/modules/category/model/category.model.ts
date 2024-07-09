import mongoose,  { Mongoose, ObjectId } from 'mongoose'

interface ICategory extends mongoose.Document{
    title:string,
    parent?: string,

}

const chaptergSchema = new mongoose.Schema<ICategory>({
    title: {type: String},
    parent: {type: String, default: ''},



})

const CategoryModel = mongoose.model<ICategory>("category", chaptergSchema)

export{
    CategoryModel,
    ICategory
}

