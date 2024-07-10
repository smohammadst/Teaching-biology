import { Request, Response, NextFunction } from "express";

import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { episodeServices } from "./episode.service";
import { EpisodeDto } from "./dto/episode.dto";

class EpisodeController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const episode: EpisodeDto = req.body;
            const {courseID, chapterID} = req.params
            const result = await episodeServices.createEpisode(courseID,chapterID,episode)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    // async update(req: Request, res: Response, next: NextFunction): Promise<Response>{
    //     try {
    //         const {id} = req.params;
    //         if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
    //         const chapter: ChapterDto = req.body;
    //         const result = await chapterServices.update(id, chapter)
    //         return res.status(200).json(result)

    //     } catch (error) {
    //         next(error)
    //     }
    // }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response>{
        try {
            const {episodeID} = req.params;
            if (!mongoose.isValidObjectId(episodeID)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await episodeServices.deleteEpisode(episodeID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

export{
    EpisodeController
}
