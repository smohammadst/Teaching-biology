import { CommentDto } from './dto/comment.Dto';
import { NextFunction, Request, Response } from "express";
import { CommentServices } from "./commnet.service";
import mongoose from 'mongoose';
import createHttpError from 'http-errors';

class CommentController {
    async createCommentAndAnswer(req: Request, res: Response, next: NextFunction) {
        try {
            const commentDto: CommentDto = req.body
            const result = await CommentServices.TyepRequest(commentDto);
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await CommentServices.removeComment(id);
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async changeStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const resulte = await CommentServices.changeStatus(id)
            return res.status(200).json(resulte)
        } catch (error) {
            next(error)
        }
    }
}

const CommentControllers = new CommentController()

export{
    CommentControllers
}