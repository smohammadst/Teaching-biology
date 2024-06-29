import { Request, Response, NextFunction } from "express";
import { BlogDto } from "./dto/blog.dto";
import { BlogServices } from "./blog.service";
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

class BlogController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const blog: BlogDto = req.body
            const result = await BlogServices.createBlog(blog)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async update(req:Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const blog: BlogDto = req.body
            const result = await BlogServices.updateBlog(id, blog)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await BlogServices.deleteBlog(id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export {
    BlogController
}