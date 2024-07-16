import mongoose,  { Mongoose, ObjectId } from 'mongoose'

interface ICategory extends mongoose.Document{
    title:string,
    parent?: ObjectId,
    type: string

}

const categorygSchema = new mongoose.Schema<ICategory>({
    title: {type: String},
<<<<<<< HEAD
    parent: {type: String, default: ''},
=======
    parent: {type: mongoose.Types.ObjectId, ref: 'category',default: undefined, required: false},
    type: {type: String, default: "Course"}



>>>>>>> 8e9e3d2edd6159a11ce032b5cc70021649a75294
})

const CategoryModel = mongoose.model<ICategory>("category", categorygSchema)

export{
    CategoryModel,
    ICategory
}

