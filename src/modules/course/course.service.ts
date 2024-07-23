import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, relatedFunc, validateObjectID } from "../../common/functions/globalFunction";
import { CourseDto } from "./dto/course.dto";
import { CourseModel, ICourse } from "./model/course.model";
import { AuthMessageError } from '../../common/enums/message.enum';
import { CategoryModel, ICategory } from '../category/model/category.model';
import { IUser, UserModel } from '../user/model/user.model';


class CourseService {
    constructor(
        private courseModel = CourseModel<ICourse>,
        private categortyModel = CategoryModel<ICategory>,
        private userRepository = UserModel<IUser>
    ) { }
    async createCourse(course: CourseDto): Promise<object> {


        //let image = course.images.map(e => e.slice(33, e.length))

        if (course.discount > 0 && course.discount != 0) {
            const add = (course.discount * course.price) / 100;
            course.priceAfterDiscount = course.price - add;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
        } else {
            course.priceAfterDiscount = course.price;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
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
        return { status: 201, message: 'دوره با موفقیت اضافه شد' }
    }


    // update Course

    async updateCourse(id: string, course: CourseDto): Promise<object> {

        await this.findOneCourse(id)

        if (course.discount > 0 && course.discount != 0) {
            const add = (course.discount * course.price) / 100;
            course.priceAfterDiscount = course.price - add;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
        } else {
            course.priceAfterDiscount = course.price;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
        }

        const result = await this.courseModel.updateOne({ _id: id }, {
            $set: {
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

            }
        })
        return { staus: 200, message: "دوره با موفقیت اپدیت شد" }
    }

    //remove Course
    async deleteCourse(id: string): Promise<object> {
        //await this.findOneCourse(id)
        const result = await this.courseModel.deleteOne({ _id: id })
        return { status: 200, message: "دوره با موفقیت حذف شد" }
    }

    async likeCourse(courseID: string, userID: string) {
        validateObjectID(courseID)
        validateObjectID(userID)
        const findUser = await this.userRepository.findOne({ _id: userID })
        if (!findUser) throw NotFound("کاربری یافت نشد")
        const findCourse = await this.findOneCourse(courseID)
        const listLike = findCourse.like
        let optionCourse: object
        let optionUser: object
        let message: string
        for (var i = 0; i < listLike.length; i++) {
            if (listLike[i] === findUser._id) {
                optionCourse = { $pull: { like: userID } }
                optionUser = { $pull: { listLikeCourse: userID } }
                message = "دوره ی مد نظر از علایق شما حذف گردید"
                break
            }
        }
        if (optionCourse) {
            optionCourse = { $push: { like: userID } }
            optionUser = { $push: { listLikeCourse: userID } }
            message = "دوره ی مد نظر شما به علایق شما اضافه گردید"
        }
        const updateCourse = await this.courseModel.updateOne({ _id: courseID }, optionCourse)
        const updateUser = await this.userRepository.updateOne({ _id: userID }, optionUser)
        if (updateCourse.modifiedCount == 0) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        if (updateUser.modifiedCount == 0) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        return { message, status: 200 }
    }
    async findCourse(id: string): Promise<ICourse> {
        const course = await this.courseModel.findOne({ _id: id })
        if (!course) throw NotFound(AuthMessageError.NotFound)
        return course
    }
    // api one course
    async findOneCourse(id: string): Promise<ICourse> {
        const course = await this.courseModel.findOne({ _id: id })
        if (!course) throw NotFound(AuthMessageError.NotFound)
        // find blog related
        const CategoryCourse = await this.courseModel.find({ category: course.category })
        const findCourse = copyObject(course);
        let relates = [];
        for (let i = 1; i < CategoryCourse.length; i++) {
            relates.push(CategoryCourse[i])
        }
        findCourse['related'] = relates

        const result = await this.courseModel.find({}).sort({ createAt: -1 });
        let latest = [];
        for (let i = 0; i < 5; i++) {
            latest.push(result[i])
            if (i = 5) break
        }
        findCourse['latest'] = latest

        return findCourse
    }
    //api all course => sort / limit / category
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
        }else if(categoryId && sort == 'high'){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit).sort({price: -1})
            result =  courses
        }else if(categoryId && sort == 'low'){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit).sort({price: +1})
            result =  courses
        }else if(categoryId){
            let category = await this.categortyModel.findOne({_id: categoryId})
            const courses = await this.courseModel.find({category: category._id}).limit(limit)
            result =  courses
        }else {
            const AllCourse = await this.courseModel.find({})
            if (!AllCourse) throw NotFound(AuthMessageError.NotFound)
            result = AllCourse
        }

        return result

    }
    async findCategoty(categoryId: string): Promise<ICategory>{
        let category = await this.categortyModel.findOne({_id: categoryId})
        if(!category) throw  NotFound(AuthMessageError.NotFound)
        return category
    }
}

const CourseServices = new CourseService()

export {

    CourseServices
}
