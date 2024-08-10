import { Date, ObjectId } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
import { BlogModel, IBlog } from "./model/blog.model";
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, like, relatedFunc, validateObjectID } from "../../common/functions/globalFunction";
import { CategoryModel, ICategory } from "../category/model/category.model";
import { IUser, UserModel } from "../user/model/user.model";
import { CourseServices } from "../course/course.service";
import { TypeLike } from "./../../common/enums/global.enum";
import { CommentService } from "../comment/commnet.service";
import { TypeEnumComment } from "../comment/enum/typeComment.enum";


class BlogService {
    constructor(
        private blogModel = BlogModel<IBlog>,
        private categoryModel = CategoryModel<ICategory>,
        private userRepository = UserModel<IUser>
    ) { }
    async createBlog(blog: BlogDto): Promise<object> {
        let category = await this.categoryModel.findOne({ _id: blog.category })
        let result = await this.blogModel.create({
            title: blog.title,
            description: blog.description,
            shortText: blog.shortText,
            status: blog.status,
            images: blog.images,
            category: category.title,
            shortLink: blog.shortLink,
            sortByNumber: blog.sortByNumber,
            comment: blog.comment,
            createdAt: new Date(),
            author: blog.author

        })
        return { message: 'با موفقیت اضافه شد' }
    }
    async updateBlog(id: string, blog: BlogDto): Promise<object> {
        await this.findBlog(id)
        let category = await this.categoryModel.findOne({ _id: blog.category })
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
                category: category.title,
                createdAt: new Date(),
                author: blog.author
            }
        })
        return { message: 'با موفقیت اپدیت شد' }
    }
    async deleteBlog(id: string): Promise<object> {
        await this.findBlog(id)
        let result = await this.blogModel.deleteOne({ _id: id });
        return { message: 'با موفقیت حذف شد' }
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
        findblog['comments'] =  await CommentService.readCommentForAsnswer(id, TypeEnumComment.blog)
        const result = await this.blogModel.find({}).sort({ createdAt: -1 });
        console.log(result);
        let latest = [];
        for (let i = 0; i < result.length; i++) {
            if (i == 5) break
            latest.push(result[i])
        }
        findblog['latest'] = latest
        const view = await this.blogModel.updateOne({ _id: id }, { $inc: { 'view': 1 } })
        return findblog
    }
    async findAllBlog(categoryId: string, limit: number, filter: string): Promise<Object> {
        let result: Array<object>;

        if (categoryId !== 'undefined' && filter == 'latest') {
            let category = await this.categoryModel.findOne({ _id: categoryId })
            const blogs = await this.blogModel.find({ category: category.title }).limit(limit).sort({ createdAt: -1 })
            result = blogs
        } else if (categoryId !== 'undefined' && filter == 'oldest') {
            let category = await this.categoryModel.findOne({ _id: categoryId })
            const blogs = await this.blogModel.find({ category: category.title }).limit(limit).sort({ createdAt: +1 })
            result = blogs
        } else if (categoryId !== 'undefined' && filter == 'popular') {
            let category = await this.categoryModel.findOne({ _id: categoryId })
            const blogs = await this.blogModel.find({ category: category.title }).limit(limit).sort({ numberLike: +1 })
            result = blogs
        } else if (categoryId !== 'undefined' && filter == "undefined") {
            let category = await this.categoryModel.findOne({ _id: categoryId })
            const blogs = await this.blogModel.find({ category: category.title }).limit(limit)
            result = blogs
        } else if (categoryId == "undefined" && filter) {
            let blogs;
            if (filter == 'latest') {
                blogs = await this.blogModel.find({}).limit(limit).sort({ createdAt: -1 })
            } else if (filter == 'oldest') {
                blogs = await this.blogModel.find({}).limit(limit).sort({ createdAt: +1 })
            } else {
                blogs = await this.blogModel.find({}).limit(limit).sort({ numberLike: +1 })
            }

            result = blogs
        } else if (categoryId !== 'undefined' && filter == "undefined") {
            const AllBlog = await this.blogModel.find({}).limit(limit)
            if (!AllBlog) throw NotFound(AuthMessageError.NotFound)
            result = AllBlog
        }
        return result
    }
    async likeBlog(blogID: string, userID: string) {
        const result = await like(blogID, userID, TypeLike.blog)
        return result
    }
}

const BlogServices = new BlogService()

export {
    BlogServices
}