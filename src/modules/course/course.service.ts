import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, relatedFunc } from "../../common/functions/globalFunction";
import { CourseDto } from "./dto/course.dto";
import { CourseModel, ICourse } from "./model/course.model";
import { AuthMessageError } from '../../common/enums/message.enum';
import { CategoryModel, ICategory } from '../category/model/category.model';


class CourseService {
    constructor(
        private courseModel = CourseModel<ICourse>,
        private categortyModel = CategoryModel<ICategory>
    ){}
    async createCourse(course: CourseDto): Promise<object>{

        //let image = course.images.map(e => e.slice(33, e.length))

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
            createdAt: new Date(),
            neededTime: course.neededTime,
            sortByNumber: course.sortByNumber,
            language: course.language,
            prerequisitesText: course.prerequisitesText,
            prerequisites: course.prerequisites,
            owner: course.owner,
            typeCourse: course.typeCourse,

        })
        return {status: 201, message: 'دوره با موفقیت اضافه شد'}
    }


    // update Course

    async updateCourse(id: string,course: CourseDto):Promise<object>{

        await this.findOneCourse(id)

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
            createdAt: new Date(),
            neededTime: course.neededTime,
            sortByNumber: course.sortByNumber,
            language: course.language,
            prerequisitesText: course.prerequisitesText,
            prerequisites: course.prerequisites,
            owner: course.owner,
            typeCourse: course.typeCourse

        }})
        return {staus: 200, message: "دوره با موفقیت اپدیت شد"}
    }

    //remove Course
    async deleteCourse(id: string): Promise<object>{
        //await this.findOneCourse(id)
        const result = await this.courseModel.deleteOne({_id: id})
        return {status: 200, message: "دوره با موفقیت حذف شد"}
    }

    //find course
    async findCourse(id: string): Promise<ICourse>{
        const course = await this.courseModel.findOne({_id: id})
        if(!course) throw NotFound(AuthMessageError.NotFound)
        return course
    }
    async findOneCourse(id: string): Promise<ICourse>{
        const course = await this.courseModel.findOne({_id: id})
        if(!course) throw  NotFound(AuthMessageError.NotFound)
        // find blog related
        const CategoryCourse = await this.courseModel.find({category: course.category})
        const findCourse = copyObject(course);
        let relates = [];
        for (let i = 1; i < CategoryCourse.length; i++){
                relates.push(CategoryCourse[i])
        }
        findCourse['related'] = relates

        const result = await this.courseModel.find({}).sort({ createAt: -1 });
        let latest = [];
        for (let i = 0; i < 5; i++){
            latest.push(result[i])
            if(i = 5) break
        }
        findCourse['latest'] = latest

        return findCourse
    }
    async findAllCourse(categoryId:string, limit: number, sort: string): Promise<Object>{
        let result: Array<object>;
        if(categoryId && sort == 'latest'){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit).sort({createdAt: -1})
            result =  courses
        }else if(categoryId && sort == 'oldest'){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit).sort({createdAt: +1})
            result =  courses
        }else if(categoryId && sort == 'popular'){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit).sort({sale: -1})
            result =  courses
        }else if(categoryId){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id})
            result =  courses
        }else {
            const AllCourse = await this.courseModel.find({})
            if(!AllCourse) throw NotFound(AuthMessageError.NotFound)
            result =  AllCourse
        }
        
        return result
        
    }

}

const CourseServices = new CourseService()

export {

    CourseServices
}