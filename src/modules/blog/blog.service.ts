import { Date } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
const createError = require("http-errors");
import { BlogModel, IBlog } from "./model/blog.model";
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { copyObject, relatedFunc } from "../../common/functions/globalFunction";


class BlogService {
    constructor(
        private blogModel = BlogModel<IBlog>
    ) { }
    async createBlog(blog: BlogDto): Promise<object> {
        // let relateArray: Array<string>;
        // if(blog.related){
        //     relateArray = blog.related.split(",")
        // }
        let result = await this.blogModel.create({
                title: blog.title,
                description: blog.description,
                shortText: blog.shortText,
                status: blog.status,
                images: blog.images,
                category: blog.category,
                shortLink: blog.shortLink,
                comment: blog.comment,
                createdAt: new Date(),
                related: blog.related,
                latest: blog.latest
        })
        return { status: 201, message: 'با موفقیت اضافه شد' }
    }
    async updateBlog(id: string, blog: BlogDto): Promise<object> {
        await this.findBlog(id)
        // let relateArray: Array<string>;
        // if(blog.related){
        //     relateArray = blog.related.split(",")
        // }
        
        let result = await this.blogModel.updateOne({ _id: id }, {
            $set: {
                title: blog.title,
                description: blog.description,
                shortText: blog.shortText,
                status: blog.status,
                images: blog.images,
                shortLink: blog.shortLink,
                comment: blog.comment,
                category: blog.category,
                createdAt: new Date(),
                related: blog.related,
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
        const findblog = copyObject(blog);       
        const relates = await relatedFunc(this.blogModel, id);
        findblog['related'] = relates
        //console.log(findblog);

        return findblog
    }
    async findAllBlog(): Promise<object>{
        const AllBlog = await this.blogModel.find({})
        if(!AllBlog) throw NotFound(AuthMessageError.NotFound)
        return AllBlog
    }

}

const BlogServices = new BlogService()

export {
    BlogServices
}


