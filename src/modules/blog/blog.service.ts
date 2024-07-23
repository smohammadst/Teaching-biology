import { Date, ObjectId } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
const createError = require("http-errors");
import { BlogModel, IBlog } from "./model/blog.model";
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, relatedFunc } from "../../common/functions/globalFunction";
import { CategoryModel, ICategory } from "../category/model/category.model";



class BlogService {
    constructor(
        private blogModel = BlogModel<IBlog>,
        public categoryModel = CategoryModel<ICategory>
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

        if (!blog) throw createError.NotFound("بلاگی با این شناسه پیدا نشد");
        return blog
    }
    async findOneBlog(id: string): Promise<IBlog>{
        const blog = await this.blogModel.findOne({_id: id})
        if(!blog) throw  NotFound(AuthMessageError.NotFound)
        // find blog related
        const CategoryBlog = await this.blogModel.find({category: blog.category})
        const findblog = copyObject(blog);
        let relates = [];
        for (let i = 1; i < CategoryBlog.length; i++){
                relates.push(CategoryBlog[i])
        }
        findblog['related'] = relates

        const result = await this.blogModel.find({}).sort({ createAt: -1 });
        let latest = [];
        for (let i = 1; i < result.length; i++){
            latest.push(result[i])
            if(i = 5) break
        }
        findblog['latest'] = latest

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

}

const BlogServices = new BlogService()

export {
    BlogServices
}


