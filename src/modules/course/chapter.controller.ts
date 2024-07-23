import { Request, Response, NextFunction } from "express";


import createHttpError from 'http-errors';
import mongoose, { isValidObjectId } from 'mongoose';
import { ChapterDto } from "./dto/chapter.dto";
import { chapterServices } from "./chapter.service";


class ChapterController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const data = req.body;
            const result = await chapterServices.createChapter(data)
            return res.status(201).json({
                message: 'دوره با موفقیت افزوده شدد'
            })
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            //if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
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
    async getChapters(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {id} = req.params;
            //if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await chapterServices.getChapters(id)
            return res.status(200).json({
                statusCode: 200,
                result
              });
        } catch (error) {
            next(error)
        }
    }
}

export{
    ChapterController
}
