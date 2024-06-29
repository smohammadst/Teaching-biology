import mongoose, { model, ObjectId } from "mongoose";

interface IFAQ extends mongoose.Document {
    question: string,
    answer: string,
}

const faqSchema = new mongoose.Schema<IFAQ>({
    question: {type:String},
    answer: {type: String},

})

const FaqModel = model<IFAQ>("faq", faqSchema)

export {
    IFAQ,
    FaqModel
}