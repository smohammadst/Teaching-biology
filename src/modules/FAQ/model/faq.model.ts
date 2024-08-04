import mongoose, { model, ObjectId } from "mongoose";

enum TypeFaq {
    course = "course",
    all = "all"
}

interface IFAQ extends mongoose.Document {
    question: string,
    answer: string,
    type: TypeFaq
}

const faqSchema = new mongoose.Schema<IFAQ>({
    question: { type: String },
    answer: { type: String },
    type: {type: String , default: TypeFaq.course}
})

const FaqModel = model<IFAQ>("faq", faqSchema)

export {
    IFAQ,
    FaqModel,
    TypeFaq
}