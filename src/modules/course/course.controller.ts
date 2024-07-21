import { Request, Response, NextFunction } from "express";
import { CourseDto } from "./dto/course.dto";
import { CourseServices } from "./course.service";
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

class CourseController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {

            const course: CourseDto = req.body;
            const result = await CourseServices.createCourse(course)
            return res.status(201).json({
                statusCode: 201,
                message: "ثبت دوره موفقیت امیز بود"
              });

        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const course: CourseDto = req.body;
            const result = await CourseServices.updateCourse(id,course)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const { id } = req.params;
            //if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await CourseServices.deleteCourse(id)
            return res.status(200).json({
                statusCode: 200,
                message: "حذف دوره موفقیت امیز بود"
              });
        } catch (error) {
            next(error)
        }
    }
    async findAllCourse(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            let {categoryId, limit} = req.params
            if('{categoryId}' == categoryId) categoryId = undefined
            const resutl = await CourseServices.findAllCourse(categoryId, +limit)
            return res.status(200).json({
                statusCode: 200,
                resutl
              });
        } catch (error) {
            next(error)
        }
    }
    async findOneCourse(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params
            const resutl = await CourseServices.findOneCourse(id)
            return res.status(200).json({
                statusCode: 200,
                resutl
              });
        } catch (error) {
            next(error)
        }
    }
}

export {
    CourseController
}