import mongoose, { Document, ObjectId } from "mongoose";

//پلن ها برای طرح اقساط
interface IInstallmentPlan extends Document {
    time: number,
    listAmount: [
        {
            amount: number
        }
    ]
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
            status: boolean
        }
    ]
}

const InstallmentPlanSchema = new mongoose.Schema<IInstallmentPlan>({
    time: { type: Number },
    listAmount: {
        type: [{
            amount: Number
        }]
    }
})

const InstallmentSchema = new mongoose.Schema<IInstallment>({
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    courses: { type: [mongoose.Types.ObjectId], ref: "course" },
    plan: { type: mongoose.Types.ObjectId, ref: "plan" },
    property: [{
        time: Date,
        amount: Number,
        status: Boolean
    }]
})