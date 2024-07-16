import { Model } from "mongoose";
import { PlanDto } from "./dto/installment.dto";
import { IInstallment, IInstallmentPlan } from "./model/installment.model";
import createHttpError from "http-errors";
import { GlobalMessageError } from "src/common/enums/message.enum";

class InstallmentService {
    constructor(
        private planRepository: Model<IInstallmentPlan>,
        private installmentRepository: Model<IInstallment>
    ) { }
    async addPlan(planDto: PlanDto) {
        const findPlan: IInstallmentPlan = await this.planRepository.findOne({ name: planDto.name })
        if (findPlan) throw createHttpError.BadRequest("این پنل موجود میباشد");
        let sum: number = 0
        for (let i = 0; i < planDto.listAmount.length; i++) {
            const amount = planDto.listAmount[i];
            sum += amount
        }
        const createPlan = await this.planRepository.create({
            name: planDto.name,
            time: planDto.time,
            listAmount: planDto.listAmount,
            sum
        })
        if (!createPlan) throw createHttpError.ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { status: 201, message: "پلن قسط با موفقیت ثبت گردید" }
    }
    async addInstallment(planId: string){
        
    }
}