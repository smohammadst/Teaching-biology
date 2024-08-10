import mongoose, { model, ObjectId } from "mongoose";

enum TypeFaq {
    course = "course",
    all = "all"
}

interface IFAQ extends mongoose.Document {
    courseID?: ObjectId,
    question: string,
    answer: string,
    type: TypeFaq
}

const faqSchema = new mongoose.Schema<IFAQ>({
    courseID: { type: mongoose.Types.ObjectId, ref: "course" },
    question: { type: String },
    answer: { type: String },
    type: { type: String, default: TypeFaq.course }
}, {
    timestamps: { createdAt: true }
})

const FaqModel = model<IFAQ>("faq", faqSchema)

export {
    IFAQ,
    FaqModel,
    TypeFaq
}