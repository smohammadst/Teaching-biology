import { NotFound, ServiceUnavailable } from "http-errors";
import { CourseDto } from "./dto/course.dto";
import { CourseModel, ICourse } from "./model/course.model";
import { validateObjectID } from "src/common/functions/globalFunction";
import { IUser, UserModel } from "../user/model/user.model";


class CourseService {
    constructor(
        private readonly courseModel = CourseModel<ICourse>,
        private readonly userRepository = UserModel<IUser>
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

    //find course
    async findOneCourse(id: string): Promise<ICourse> {
        const course = await this.courseModel.findOne({ _id: id })
        if (!course) throw NotFound("دوره ای با این ایدی یافت نشد")
        return course
    }
    async findAllCourse(): Promise<object> {
        const AllCourse = await this.courseModel.find({})
        if (!AllCourse) throw NotFound("دوره ای با این ایدی یافت نشد")
        return AllCourse
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
        if(updateUser.modifiedCount == 0 ) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        return { message, status: 200 }
    }
}

const CourseServices = new CourseService()

export {

    CourseServices
}