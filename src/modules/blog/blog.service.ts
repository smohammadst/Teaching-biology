import { Model } from "mongoose";
import { BlogDto } from "./dto/blog.dto";
const createError = require("http-errors");
import { BlogModel, IBlog } from "./model/blog.model";

class BlogService {
    constructor(
        private blogModel = Model<IBlog>
    ) { }
    async createBlog(blog: BlogDto): Promise<object> {
        let result = await this.blogModel.create({
            title: blog.title,
            text: blog.text,
            shortText: blog.shortText,
            status: blog.status,
            images: blog.images,
            shortLink: blog.shortLink,
            comment: blog.comment,
        })
        return { status: 201, message: 'با موفقیت اضافه شد' }
    }
    async updateBlog(id: string, blog: BlogDto): Promise<object> {
        await this.findBlog(id)
        let result = await this.blogModel.updateOne({ _id: id }, {
            $set: {
                title: blog.title,
                text: blog.text,
                shortText: blog.shortText,
                status: blog.status,
                images: blog.images,
                shortLink: blog.shortLink,
                comment: blog.comment,
            }
        })
        return { stauts: 200, message: 'با موفقیت اپدیت شد' }
    }
    async removeBlog(id: string): Promise<object> {
        await this.findBlog(id)
        let result = await this.blogModel.deleteOne({ _id: id });
        return { stauts: 200, message: 'با موفقیت حذف شد' }
    }
    async findBlog(id: string): Promise<IBlog> {
        const blog = await this.blogModel.findOne({ _id: id });
        if (!blog) throw createError.NotFound("بلاگی با این شناسه پیدا نشد");
        return blog
    }

}

const BlogServices = new BlogService()

export {
    BlogServices
}