import { CommentDto } from './dto/comment.Dto';
import { NextFunction, Request, Response } from "express";
import { CommentService } from "./commnet.service";
import mongoose from 'mongoose';
import * as createHttpError from 'http-errors';
import { IUser } from '../user/model/user.model';

class CommentController {
    async createCommentAndAnswer(req: Request & { user: IUser }, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userID = req.user
            const commentDto: CommentDto = req.body
            const result = await CommentService.TyepRequest(commentDto, userID._id);
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async deleteComment(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await CommentService.removeComment(id);
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async changeStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const { id } = req.params
            const { status } = req.body
            if (!mongoose.isValidObjectId(id)) throw createHttpError.BadRequest("آیدی ارسال شده صحیح نمیباشد")
            const result = await CommentService.changeStatus(id, status)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async readAllComments(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const result = await CommentService.readAllCommentsAndAnswerByAdmin();
            return res.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }
}

const commentController = new CommentController()

export {
    commentController as CommentController
}