import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthDto, ChangePasswordDto } from "./dto/aurh.dto";

export class AuthController {
    async userExistence(req: Request, res: Response, next: NextFunction) {
        try {
            const authDto: AuthDto = req.body;
            const result = await AuthService.userExistence(authDto);
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const changePasswordDto: ChangePasswordDto = req.body;
            const result = await AuthService.changePassword(changePasswordDto)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}