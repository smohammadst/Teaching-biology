import mongoose, { Document, ObjectId } from "mongoose";

//پلن ها برای طرح اقساط
interface IInstallmentPlan extends Document {
    name: string,
    time: number,
    listAmount: [number]
    sum: number
}

//دوره آموزشی و کاربری که اقساطی خرید کرده
//پراپرتی تعداد اقساط با روز و مبلغ واریزی
interface IInstallment extends Document {
    user: ObjectId,
    courses: Array<ObjectId>,
    plan: ObjectId,
    property: [
        {
            time: Date,
            amount: number,
            statusPayment: boolean,
            status: boolean
        }
    ]
}

const InstallmentPlanSchema = new mongoose.Schema<IInstallmentPlan>({
    name: { type: String, unique: true, trim: true },
    time: { type: Number },
    listAmount: {
        type: [Number]
    },
    sum: { type: Number }
})

const InstallmentSchema = new mongoose.Schema<IInstallment>({
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    courses: { type: [mongoose.Types.ObjectId], ref: "course" },
    plan: { type: mongoose.Types.ObjectId, ref: "plan" },
    property: [
        {
            time: Date,
            amount: Number,
            status: Boolean,
            statusPayment: Boolean
        }
    ]
})
const planModel = mongoose.model<IInstallmentPlan>("installmentplan",InstallmentPlanSchema)
const installmentModel = mongoose.model<IInstallment>("installment",InstallmentSchema)

export{
    IInstallment,
    IInstallmentPlan
}