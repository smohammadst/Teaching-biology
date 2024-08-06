import { FaqDto } from "./dto/faq.dto";
import { FaqModel, IFAQ, TypeFaq } from "./model/faq.model";
import { Model } from "mongoose";
import * as createHttpError from 'http-errors';
import { CourseModel, ICodeDisCount, ICourse } from "../course/model/course.model";

class FaqService {
    constructor(
        private readonly faqModel = FaqModel<IFAQ>,
        private readonly courseRepository = CourseModel<ICodeDisCount>
    ) { }

    async createFaq(faq: FaqDto): Promise<object> {
        let result: IFAQ
        switch (faq.type) {
            case TypeFaq.course:
                let findCourse = await this.courseRepository.findOne({ _id: faq.courseID })
                if (!findCourse) throw createHttpError.NotFound("دوره ایی یافت نشد")
                result = await this.faqModel.create({
                    question: faq.question,
                    answer: faq.answer,
                    type: faq.type,
                    courseID: faq.courseID
                })
                findCourse.updateOne({ $push: { faq: result._id } })
                return { message: "سوالات متداول با موفقیت اضافه شد" }
            case TypeFaq.all:
                result = await this.faqModel.create({
                    question: faq.question,
                    answer: faq.answer,
                    type: faq.type,
                })
                return { message: "سوالات متداول با موفقیت اضافه شد" }
        }
    }

    async deleteFaq(id: string): Promise<object> {
        const result = await this.faqModel.deleteOne({ _id: id })
        return { message: "سوالات متداول با موفقیت حذف شد" }
    }

    async findFaq(id: string, type: TypeFaq): Promise<IFAQ[] | ICourse> {
        switch (type) {
            case TypeFaq.all:
                const findFaq = await this.faqModel.find({ type: TypeFaq.all })
                if (!findFaq) throw createHttpError.NotFound("سوال جوابی پیدا نشد")
                return findFaq
            case TypeFaq.course:
                const findCourse = await (await this.courseRepository.findOne({ _id: id })).populate({ path: "faq", model: "faq" })
                if (!findCourse) throw createHttpError.NotFound("دوره ایی یافت نشد")
                return findCourse
        }
    }
    async update(id: string, faqDto: FaqDto) {
        const find = await this.faqModel.findOne({ _id: id })
        if (!find) throw createHttpError.NotFound("یافت نشد")
        await find.updateOne({
            $set: {
                question: faqDto.question,
                answer: faqDto.answer,
                type: faqDto.answer
            }
        })
        await find.save()
        return { message: "با موفقیت افزوده شد" }
    }
}

const FaqServices = new FaqService()

export {
    FaqServices
}