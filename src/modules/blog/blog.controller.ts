import { Request, Response, NextFunction } from "express";
import { BlogDto } from "./dto/blog.dto";
import { BlogServices } from "./blog.service";

class BlogController {

    async create(req:Request, res: Response, next: NextFunction){
        try {
            const blog: BlogDto = req.body
            const createBlog = await BlogServices.createBlog(blog)
            return res.status(201).json({
                blogs: createBlog
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req:Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const blog: BlogDto = req.body
            const updateBlog = await BlogServices.updateBlog(id, blog)
            return res.status(200).json({
                blogs: updateBlog
            })
        } catch (error) {
            next(error)
        }
    }
    async remove(req: Request, res: Response, next: NextFunction){
        try {
            const {id} = req.params;
            const removeBlog = await BlogServices.removeBlog(id)
            return res.status(200).json({
                blog: removeBlog
            })
        } catch (error) {
            next(error)
        }
    }
}

export {
    BlogController
}