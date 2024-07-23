import { Request, Response, NextFunction } from "express";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

class UserController {
    async getAllComment(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userID = req.user._id
            const result = await UserService.getAllCommentUser(userID);
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async findEvidenceUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.findEvidenceForUser(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getLikeCourse(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.getLikeCourse(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async getLikeBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.user._id
            const result = await UserService.getLikeBlog(userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}
export {
    UserController
}