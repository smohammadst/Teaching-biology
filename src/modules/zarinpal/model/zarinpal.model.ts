import mongoose, { Document, model, ObjectId } from "mongoose";

interface ISale extends Document {
    userID: ObjectId,
    courseID: Array<ObjectId>,
    payment: ObjectId,
}

const saleSchema = new mongoose.Schema<ISale>({
    userID: { type: mongoose.Types.ObjectId, ref: "user" },
    courseID: { type: [mongoose.Types.ObjectId], ref: "course" },
    payment: { type: mongoose.Types.ObjectId, ref: "payment" }
})

interface IPayment extends Document {
    invoiceNumber: string,
    authority: string,
    paymentData: number,
    amount: number,
    description: string,
    verify: boolean,
    user: ObjectId,
    refID: string,
    saleID: ObjectId,
    cardHash: string,
}

const paymentSchema = new mongoose.Schema<IPayment>({
    invoiceNumber: { type: String },
    authority: { type: String },
    paymentData: { type: Number },
    amount: { type: Number },
    description: { type: String },
    verify: { type: Boolean },
    refID: { type: String },
    saleID: { type: mongoose.Types.ObjectId, ref: "sale" },
    cardHash: { type: String }
})

const SaleModel = model<ISale>("sale", saleSchema)
const PaymentModel = model<IPayment>("payment", paymentSchema)

export {
    IPayment,
    ISale,
    SaleModel,
    PaymentModel
}