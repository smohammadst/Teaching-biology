import { CourseDto } from "./dto/course.dto";
import { CourseModel, ICourse } from "./model/course.model";
const createError = require("http-errors");

class CourseService {
    constructor(
        private courseModel = CourseModel<ICourse>
    ){}
    async createCourse(course: CourseDto): Promise<object>{
        let result = await this.courseModel.create({
            title: course.title,
            text: course.text,
            shortText: course.shortText,
            price: course.price,
            discount: course.discount,
            finalPrice: course.finalPrice,
            category: course.category,
            images: course.images,
            comments: course.comments,
            faq: course.faq,

        })
        return {status: 201, message: 'دوره با موفقیت اضافه شد'}
    }

    // update Course

    async updateCourse(id: string,course: CourseDto):Promise<object>{
        await this.findCourse(id)
        const result = await this.courseModel.updateOne({_id: id}, {$set: {
            title: course.title,
            text: course.text,
            shortText: course.shortText,
            price: course.price,
            discount: course.discount,
            finalPrice: course.finalPrice,
            category: course.category,
            images: course.images,
            comments: course.comments,
            faq: course.faq,

        }})
        return {staus: 200, message: "دوره با موفقیت اپدیت شد"}
    }

    //remove Course
    async deleteCourse(id: string): Promise<object>{
        await this.findCourse(id)
        const result = await this.courseModel.deleteOne({_id: id})
        return {status: 200, message: "دوره با موفقیت حذف شد"}
    }

    //find course
    async findCourse(id: string): Promise<ICourse>{
        const course = await this.courseModel.findOne({_id: id})
        if(!course) throw createError.NotFound("دوره ای با این ایدی یافت نشد")
        return course
    }
}

const CourseServices = new CourseService()

export {

    CourseServices
}