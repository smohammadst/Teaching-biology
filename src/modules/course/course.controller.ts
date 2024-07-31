import { Request, Response, NextFunction } from "express";
import { CodeDto, CourseDto } from "./dto/course.dto";
import { CourseServices } from "./course.service";
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { AuthMessageError, GlobalMessageError } from '../../common/enums/message.enum';
import mongoose, { isValidObjectId } from 'mongoose';
import { stringify } from "querystring";

class CourseController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {

            const course: CourseDto = req.body;
            console.log(course);
            const result = await CourseServices.createCourse(course)
            return res.status(201).json({
                statusCode: 201,
                message: "ثبت دوره موفقیت امیز بود"
            });

        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) throw BadRequest(GlobalMessageError.BadRequest)
            const course: CourseDto = req.body;
            const result = await CourseServices.updateCourse(id, course)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params;
            if (!mongoose.isValidObjectId(id)) throw BadRequest(GlobalMessageError.BadRequest)
            const result = await CourseServices.deleteCourse(id)
            return res.status(200).json({
                statusCode: 200,
                message: "حذف دوره موفقیت امیز بود"
            });
        } catch (error) {
            next(error)
        }
    }
    async findAllCourse(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let { categoryId, limit, sort } = req.params
            // if('{categoryId}' == categoryId) categoryId = "undefined"
            // if('{limit}' == limit) limit = "undefined"
            // if('{sort}' == sort) sort = "undefined"
            const result = await CourseServices.findAllCourse(categoryId, +limit, sort)
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
    async findOneCourse(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params

            const result = await CourseServices.findOneCourse(id)
            return res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    }
    async createCodeDiscount(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CodeDto = req.body
            const result = await CourseServices.createCodeDiscount(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export {
    CourseController
}