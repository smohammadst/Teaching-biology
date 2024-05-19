import { Request, Response, NextFunction } from "express";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

class UserController {
    async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user: UserDto = req.body
            const createUser = await UserService.create(user)
            return res.status(200).json({
                users: createUser
            })
        } catch (error) {
            next(error)
        }
    }
}
export {
    UserController
}