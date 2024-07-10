import { Request, Response, NextFunction } from "express";
import { chapterServices } from "./chapter.service";
import { ChapterDto } from "./dto/chapter.dto";
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

class ChapterController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const chapter: ChapterDto = req.body;
            const {id} = req.params
            const result = await chapterServices.createChapter(id,chapter)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const chapter: ChapterDto = req.body;
            const result = await chapterServices.update(id, chapter)
            return res.status(200).json(result)

        } catch (error) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await chapterServices.delete(id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export{
    ChapterController
}
