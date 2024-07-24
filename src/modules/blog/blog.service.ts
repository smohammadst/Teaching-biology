import { Date, ObjectId } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
import { BlogModel, IBlog } from "./model/blog.model";
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, relatedFunc, validateObjectID } from "../../common/functions/globalFunction";
import { CategoryModel, ICategory } from "../category/model/category.model";
import { IUser, UserModel } from "../user/model/user.model";
import { CourseServices } from "../course/course.service";
import e from "express";



class BlogService {
    constructor(
        private blogModel = BlogModel<IBlog>,
        private categoryModel = CategoryModel<ICategory>,
        private userRepository = UserModel<IUser>
    ) { }
    async createBlog(blog: BlogDto): Promise<object> {
        let result = await this.blogModel.create({
                title: blog.title,
                description: blog.description,
                shortText: blog.shortText,
                status: blog.status,
                images: blog.images,
                category: blog.category,
                shortLink: blog.shortLink,
                sortByNumber: blog.sortByNumber,
                comment: blog.comment,
                createdAt: new Date(),
                latest: blog.latest
        })
        return { status: 201, message: 'با موفقیت اضافه شد' }
    }
    async updateBlog(id: string, blog: BlogDto): Promise<object> {
        await this.findBlog(id)
        let result = await this.blogModel.updateOne({ _id: id }, {
            $set: {
                title: blog.title,
                description: blog.description,
                shortText: blog.shortText,
                status: blog.status,
                images: blog.images,
                shortLink: blog.shortLink,
                comment: blog.comment,
                sortByNumber: blog.sortByNumber,
                category: blog.category,
                createdAt: new Date(),
                latest: blog.latest
            }
        })
        return { stauts: 200, message: 'با موفقیت اپدیت شد' }
    }
    async deleteBlog(id: string): Promise<object> {
        await this.findBlog(id)
        let result = await this.blogModel.deleteOne({ _id: id });
        return { stauts: 200, message: 'با موفقیت حذف شد' }
    }
    async findBlog(id: string): Promise<IBlog> {
        const blog = await this.blogModel.findOne({ _id: id });

        if (!blog) throw NotFound("بلاگی با این شناسه پیدا نشد");
        return blog
    }
    async findOneBlog(id: string): Promise<IBlog> {
        const blog = await this.blogModel.findOne({ _id: id })
        if (!blog) throw NotFound(AuthMessageError.NotFound)
        // find blog related
        const CategoryBlog = await this.blogModel.find({ category: blog.category })
        const findblog = copyObject(blog);
        let relates = [];
        for (let i = 1; i < CategoryBlog.length; i++) {
            relates.push(CategoryBlog[i])
        }
        findblog['related'] = relates

        const result = await this.blogModel.find({}).sort({ createdAt: -1 });
        console.log(result);
        let latest = [];
        for (let i = 0; i < result.length; i++){
            if(i == 5) break
            latest.push(result[i])
            
            
        }
        findblog['latest'] = latest
        const view = await this.blogModel.updateOne({_id: id},{$inc: {'view': 1 }} )

        return findblog
    }
    async findAllBlog(categoryId:string, limit: number, filter: string): Promise<Object>{
        let result: Array<object>;
        if(categoryId && filter == 'latest'){
            let category = await this.categoryModel.findOne({_id: categoryId})
            const blogs = await this.blogModel.find({category: category._id}).limit(limit).sort({createdAt: -1})
            result =  blogs
        }else if(categoryId && filter == 'oldest'){
            let category = await this.categoryModel.findOne({_id: categoryId})
            const blogs = await this.blogModel.find({category: category._id}).limit(limit).sort({createdAt: +1})
            result =  blogs
        }else if(!categoryId && limit){
            const blogs = await this.blogModel.find({}).limit(limit)
            result =  blogs
        }else if(categoryId){
            let category = await this.categoryModel.findOne({_id: categoryId})
            const blogs = await this.blogModel.find({category: category._id}).limit(limit)
            result =  blogs
        }else {
            const AllBlog = await this.blogModel.find({})
            if(!AllBlog) throw NotFound(AuthMessageError.NotFound)
            result =  AllBlog
        }
        
        return result
        
    }

    async likeCourse(courseID: string, userID: string) {
        validateObjectID(courseID)
        validateObjectID(userID)
        const findUser = await this.userRepository.findOne({ _id: userID })
        if (!findUser) throw NotFound("کاربری یافت نشد")
        const findCourse = await CourseServices.findOneCourse(courseID)
        const listLike = findCourse.like
        let optionCourse: object
        let optionUser: object
        let message: string
        for (var i = 0; i < listLike.length; i++) {
            if (listLike[i] === findUser._id) {
                optionCourse = { $pull: { like: userID } }
                optionUser = { $pull: { listLikeBlog: userID } }
                message = "مقاله مد نظر از علایق شما حذف گردید"
                break
            }
        }
        if (optionCourse) {
            optionCourse = { $push: { like: userID } }
            optionUser = { $push: { listLikeCourse: userID } }
            message = "مقاله مد نظر شما به علایق شما اضافه گردید"
        }
        const updateCourse = await this.blogModel.updateOne({ _id: courseID }, optionCourse)
        const updateUser = await this.userRepository.updateOne({ _id: userID }, optionUser)
        if (updateCourse.modifiedCount == 0) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        if (updateUser.modifiedCount == 0) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        return { message, status: 200 }
    }

}

const BlogServices = new BlogService()

export {
    BlogServices
}


