import { FaqDto } from "./dto/faq.dto";
import { IFAQ } from "./model/faq.model";
import { Model } from "mongoose";
const createError = require("http-errors");

class FaqService {
    constructor(
        private faqModel = Model<IFAQ>
    ) { }

    async createFaq(faq: FaqDto): Promise<object>{
        let result = await this.faqModel.create({
            question: faq.question,
            answer: faq.answer
        })
        return { status: 201, message: "سوالات متداول با موفقیت اضافه شد" }
    }
    
    async deleteFaq(id: string): Promise<object>{
        const result = await this.faqModel.deleteOne({_id: id})
        return {status: 200, message: "سوالات متداول با موفقیت حذف شد"}
    }

    async findFaq(id: string): Promise<IFAQ> {
        const faq = await this.faqModel.findOne({ _id: id });
        if (!faq) throw createError.NotFound("سوالات متداولی  با این شناسه یافت نشد")
        return faq
    }
}

const FaqServices = new FaqService()

export {
    FaqServices
}