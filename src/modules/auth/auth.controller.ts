import { NextFunction, Request, Response } from "express";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, CheckOtp, ResetCodeDto } from "./dto/aurh.dto";

export class AuthController {

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const body: RegisterDto = req.body
            const result: object = await AuthService.register(body)
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async loginOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const body: LoginDto = req.body
            const result: object = await AuthService.loginOtp(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async checkOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CheckOtp = req.body
            const result: object = await AuthService.checkOtp(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async resetCode(req: Request, res: Response, next: NextFunction) {
        try {
            const body: ResetCodeDto = req.body
            const result: object = await AuthService.resetCode(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }


    async refreshToken(req: Request & { user: string }, res: Response, next: NextFunction) {
        try {
            const userID = req.user
            const refreshToken = await AuthService.refreshToken(userID)
            return res.status(200).json({ refreshToken, statusCode: 200 })
        } catch (error) {
            next(error)
        }
    }
}