import mongoose, { Mongoose, ObjectId } from 'mongoose'

enum typeCategory {
    course = "Course",
    blog = "Blog"
}

interface ICategory extends mongoose.Document {
    title: string,
    parent?: ObjectId,
    type: typeCategory
}

const categorygSchema = new mongoose.Schema<ICategory>({
    title: { type: String },
    parent: { type: mongoose.Types.ObjectId, ref: 'category', default: undefined, required: false },
    type: { type: String, default: typeCategory.course }
})

const CategoryModel = mongoose.model<ICategory>("category", categorygSchema)

export {
    CategoryModel,
    ICategory
}

