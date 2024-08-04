import { FaqDto } from "./dto/faq.dto";
import { IFAQ } from "./model/faq.model";
import { Model } from "mongoose";
import createHttpError from 'http-errors';

class FaqService {
    constructor(
        private faqModel = Model<IFAQ>
    ) { }

    async createFaq(faq: FaqDto): Promise<object> {
        let result = await this.faqModel.create({
            question: faq.question,
            answer: faq.answer,
            type: faq.type
        })
        return { message: "سوالات متداول با موفقیت اضافه شد" }
    }

    async deleteFaq(id: string): Promise<object> {
        const result = await this.faqModel.deleteOne({ _id: id })
        return { message: "سوالات متداول با موفقیت حذف شد" }
    }

    async findFaq(id: string): Promise<IFAQ> {
        const faq = await this.faqModel.findOne({ _id: id });
        if (!faq) throw createHttpError.NotFound("سوالات متداولی  با این شناسه یافت نشد")
        return faq
    }
}

const FaqServices = new FaqService()

export {
    FaqServices
}