import { CourseDto } from "./dto/course.dto";
import { CourseModel, ICourse } from "./model/course.model";
const createError = require("http-errors");

class CourseService {
    constructor(
        private courseModel = CourseModel<ICourse>
    ){}
    async createCourse(course: CourseDto): Promise<object>{

        course.images = course.images.map(e => e.slice(33, e.length))
        if (course.discount > 0 && course.discount != 0) {
            const add = (course.discount * course.price) / 100;
            course.priceAfterDiscount = course.price - add;
            course.priceAfterDiscount = Math.floor( course.priceAfterDiscount / 10000) * 10000 
        } else {
            course.priceAfterDiscount = course.price;
            course.priceAfterDiscount = Math.floor( course.priceAfterDiscount / 10000) * 10000
        }
        let result = await this.courseModel.create({
        
            title: course.title,
            Description: course.Description,
            shortText: course.shortText,
            price: course.price,
            discount: course.discount,
            priceAfterDiscount: course.priceAfterDiscount,
            category: course.category,
            images: course.images,
            comments: course.comments,
            faq: course.faq,
            neededTime: course.neededTime,
            sortByNumber: course.sortByNumber,
            language: course.language,
            prerequisitesText: course.prerequisitesText,
            prerequisites: course.prerequisites,
            owner: course.owner

        })
        return {status: 201, message: 'دوره با موفقیت اضافه شد'}
    }

    // update Course

    async updateCourse(id: string,course: CourseDto):Promise<object>{

        await this.findCourse(id)

        if (course.discount > 0 && course.discount != 0) {
            const add = (course.discount * course.price) / 100;
            course.priceAfterDiscount = course.price - add;
            course.priceAfterDiscount = Math.floor( course.priceAfterDiscount / 10000) * 10000 
        } else {
            course.priceAfterDiscount = course.price;
            course.priceAfterDiscount = Math.floor( course.priceAfterDiscount / 10000) * 10000
        }

        const result = await this.courseModel.updateOne({_id: id}, {$set: {
            title: course.title,
            Description: course.Description,
            shortText: course.shortText,
            price: course.price,
            discount: course.discount,
            priceAfterDiscount: course.priceAfterDiscount,
            category: course.category,
            images: course.images,
            comments: course.comments,
            faq: course.faq,
            neededTime: course.neededTime,
            sortByNumber: course.sortByNumber,
            language: course.language,
            prerequisitesText: course.prerequisitesText,
            prerequisites: course.prerequisites,
            owner: course.owner

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