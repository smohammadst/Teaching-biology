import { Request, Response, NextFunction } from "express";

import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { CategoryDto } from "./dto/category.dto";
import { categoryServices } from "./category.service";

class CategoryController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            
            const category: CategoryDto = req.body
            const result = await categoryServices.createCategory(category)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getAllChildern(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {nameParent} = req.body;
            const result = await categoryServices.getChildern(nameParent)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }


}

export{
    CategoryController
}
