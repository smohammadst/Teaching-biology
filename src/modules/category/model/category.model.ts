import mongoose, { Mongoose, ObjectId } from 'mongoose'

// enum typeCategory {
//     course = "course",
//     blog = "blog"
// }

interface ICategory extends mongoose.Document {
    title: string,
    parent?: ObjectId,
    type: string
}

const categorygSchema = new mongoose.Schema<ICategory>({
    title: { type: String },
    parent: { type: mongoose.Types.ObjectId, ref: 'category', default: undefined, required: false },
    type: { type: String }
})

const CategoryModel = mongoose.model<ICategory>("category", categorygSchema)

export {
    CategoryModel,
    ICategory
}

