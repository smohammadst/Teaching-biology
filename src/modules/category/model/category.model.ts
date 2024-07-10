import mongoose,  { Mongoose, ObjectId } from 'mongoose'

interface ICategory extends mongoose.Document{
    title:string,
    parent?: string,

}

const categorygSchema = new mongoose.Schema<ICategory>({
    title: {type: String},
    parent: {type: String, default: ''},



})

const CategoryModel = mongoose.model<ICategory>("category", categorygSchema)

export{
    CategoryModel,
    ICategory
}

