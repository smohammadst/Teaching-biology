import { Request, Response, NextFunction } from "express";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { IUser } from "./model/user.model";

class UserController {
    async getAllComment(req: Request & { user: IUser }, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userID = req.user._id
            const result = await UserService.getAllCommentUser(userID);
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async findEvidenceUser(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.findEvidenceForUser(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getLikeCourse(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.getLikeCourse(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getLikeBlog(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.getLikeBlog(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getBought(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const result = await UserService.bought(user._id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getAllUser(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.getAllUser()
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export {
    UserController
}