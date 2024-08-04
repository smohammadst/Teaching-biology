import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, like, relatedFunc, validateObjectID } from "../../common/functions/globalFunction";
import { CodeDto, CourseDto } from "./dto/course.dto";
import { CodeDiscountModel, CourseModel, ICodeDisCount, ICourse } from "./model/course.model";
import { AuthMessageError, GlobalMessageError } from '../../common/enums/message.enum';
import { CategoryModel, ICategory } from '../category/model/category.model';
import { IUser, UserModel } from '../user/model/user.model';
import { TypeLike } from 'src/common/enums/global.enum';


class CourseService {
    constructor(
        private readonly courseModel = CourseModel<ICourse>,
        private readonly categortyModel = CategoryModel<ICategory>,
        private readonly userRepository = UserModel<IUser>,
        private readonly codeRepository = CodeDiscountModel<ICodeDisCount>
    ) { }
    async createCourse(course: CourseDto): Promise<object> {
        //let image = course.images.map(e => e.slice(33, e.length))
        let category = await this.categortyModel.findOne({ _id: course.category })
        if (course.discount > 0 && course.discount != 0) {
            const add = (course.discount * course.price) / 100;
            course.priceAfterDiscount = course.price - add;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
        } else {
            course.priceAfterDiscount = course.price;
            course.priceAfterDiscount = Math.floor(course.priceAfterDiscount / 10000) * 10000
        }
        const prerequisitesArray = [];
        for (let i = 0; i < course.prerequisites.length; i++) {
            const coursePre = await this.courseModel.find({ _id: course.prerequisites[i] })
            prerequisitesArray.push(coursePre)
        }

        let result = await this.courseModel.create({
            title: course.title,
            Description: course.Description,
            shortText: course.shortText,
            price: course.price,
            discount: course.discount,
            priceAfterDiscount: course.priceAfterDiscount,
            category: category.title,
            images: course.images,
            comments: course.comments,
            faq: course.faq,
            createdAt: new Date(),
            neededTime: course.neededTime,
            sortByNumber: course.sortByNumber,
            language: course.language,
            prerequisitesText: course.prerequisitesText,
            prerequisites: prerequisitesArray,
            owner: course.owner,
            level: course.level,
            rating: course.rating,
            type: course.type
        })
        return { message: 'دوره با موفقیت اضافه شد' }
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
        const prerequisitesArray = [];
        for (let i = 0; i < course.prerequisites.length; i++) {
            const coursePre = await this.courseModel.find({ _id: course.prerequisites[i] })
            prerequisitesArray.push(coursePre)
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
                prerequisites: prerequisitesArray,
                owner: course.owner,
                level: course.level,
                rating: course.rating,
                type: course.type

            }
        })
        return { message: "دوره با موفقیت اپدیت شد" }
    }

    //remove Course
    async deleteCourse(id: string): Promise<object> {
        //await this.findOneCourse(id)
        const result = await this.courseModel.deleteOne({ _id: id })
        return { status: 200, message: "دوره با موفقیت حذف شد" }
    }

    async likeCourse(courseID: string, userID: string) {
        const result = await like(courseID , userID, TypeLike.course)
        return result
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
        for (let i = 0; i < CategoryCourse.length; i++) {
            if(CategoryCourse[i]._id == id){
                continue
            }else{
                relates.push(CategoryCourse[i])
            }
                 
            
        }
        findCourse['related'] = relates

        const result = await this.courseModel.find({}).sort({ createdAt: -1 });
        let latest = [];
        for (let i = 0; i < result.length; i++) {
            if (i == 5) break
            latest.push(result[i])

        }
        findCourse['latest'] = latest


        const view = await this.courseModel.updateOne({ _id: id }, { $inc: { 'view': 1 } })

        return findCourse
    }
    //api all course => sort / limit / category
    async findAllCourse(categoryId: string, limit: number, sort: string): Promise<Object> {
        let result;
        if (categoryId !== 'undefined' && sort == 'latest') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit).sort({ createdAt: -1 })
            result = courses
        } else if (categoryId !== 'undefined' && sort == 'oldest') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit).sort({ createdAt: +1 })
            result = courses
        } else if (categoryId !== 'undefined' && sort == 'popular') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit).sort({ sale: -1 })
            result = courses
        } else if (categoryId !== 'undefined' && sort == 'high') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit).sort({ price: -1 })
            result = courses
        } else if (categoryId !== 'undefined' && sort == 'low') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit).sort({ price: +1 })
            result = courses
        } else if (categoryId !== 'undefined') {
            let category = await this.categortyModel.findOne({ _id: categoryId })
            const courses = await this.courseModel.find({ category: category.title }).limit(limit)
            result = courses
        } else if (categoryId == "undefined" && sort !== "undefined") {
            let courses;
            if (sort == 'latest') {
                courses = await this.courseModel.find({}).limit(limit).sort({ createdAt: -1 })
            } else if (sort == 'oldest') {
                courses = await this.courseModel.find({}).limit(limit).sort({ createdAt: +1 })
            } else if (sort == 'popular') {
                courses = await this.courseModel.find({}).limit(limit).sort({ sale: -1 })
            } else if (sort == 'low') {
                courses = await this.courseModel.find({}).limit(limit).sort({ price: +1 })
            } else if (sort == "high") {
                courses = await this.courseModel.find({}).limit(limit).sort({ price: -1 })
            }
            result = courses
        } else if (categoryId == 'undefined' && sort == "undefined") {
            const AllCourse = await this.courseModel.find({}).limit(limit)
            if (!AllCourse) throw NotFound(AuthMessageError.NotFound)
            result = AllCourse
        }

        return result

    }
    async findCategoty(categoryId: string): Promise<ICategory> {
        let category = await this.categortyModel.findOne({ _id: categoryId })
        if (!category) throw NotFound(AuthMessageError.NotFound)
        return category
    }

    async createCodeDiscount(codeDto: CodeDto) {
        const { code, discount } = codeDto;
        const findCode = await this.codeRepository.findOne({ code })
        if (findCode) throw BadRequest("کد قبلا وجود داشته است")
        const create = await this.codeRepository.create({
            code,
            discount
        })
        if (!create) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { message: "کد با تخفیف ساخته شد" }
    }
}

const CourseServices = new CourseService()

export {

    CourseServices
}
