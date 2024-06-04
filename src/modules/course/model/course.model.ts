import mongoose, { model, ObjectId } from "mongoose";

interface ICourse extends mongoose.Document {
    comments: Array<ObjectId>
}

const courseSchema = new mongoose.Schema<ICourse>({
    comments: { type: [mongoose.Types.ObjectId], ref: "comment" }
})

const CourseModel = model<ICourse>("course", courseSchema)

export {
    ICourse,
    CourseModel
}