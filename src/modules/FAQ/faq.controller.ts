import { Request, Response, NextFunction } from "express";
import { FaqDto } from "./dto/faq.dto";
import { FaqServices } from "./faq.service";
import mongoose from 'mongoose';
import createHttpError from 'http-errors';



class FaqController {

    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const faq: FaqDto = req.body;
            const result = await FaqServices.createFaq(faq)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    async delete(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await FaqServices.deleteFaq(id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
        
    }
}

export {
    FaqController
}