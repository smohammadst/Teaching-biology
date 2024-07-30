import mongoose, { Document } from "mongoose";

interface ITiket extends Document {
    desc: string,
    phone: string,
    title: string
}

const tiketSchema = new mongoose.Schema<ITiket>({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    phone: { type: String, required: true }
})

const TiketModel = mongoose.model<ITiket>("tiket" , tiketSchema)

export {
    TiketModel,
    ITiket
}