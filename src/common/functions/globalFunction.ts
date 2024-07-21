import createHttpError from "http-errors";
import { IUser, UserModel } from "./../../modules/user/model/user.model";
import { AuthMessageError, NotFoundError } from "../enums/message.enum";
import { Request, Response, NextFunction } from "express";
import moment from "moment-jalali"
import Jwt from "jsonwebtoken";
import { TTokenPayload } from "../types/token.type";

async function checkRole(req: Request & { user: string }, role: Array<string>) {
    const userID = req?.user
    const userRepository = UserModel<IUser>
    const findUser: IUser = await userRepository.findOne({ _id: userID })
    if (!findUser) throw createHttpError.NotFound(AuthMessageError.NotFound);
    const Role = findUser.Role;
    for (var i = 0; i < role.length; i++) {
        if (!Role.includes(role[i])) {
            throw createHttpError.Unauthorized("شما به این آدرس دسترسی ندارید")
        }
    }
}

function randomNumber() {
    return "" + Math.floor(Math.random() * 90000 + 10000);
}

function invoiceNumberGenerator(): string {
    return (
        moment().format("jYYYYjMMjDDHHmmssSSS") +
        String(process.hrtime()[1]).padStart(9)
    );
}

async function verifyToken(req: Request & { user: string }, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) return next(createHttpError.Unauthorized("دوباره تلاش کنید"));
    const authorization: string = req.headers["authorization"];
    const token: string = authorization.split(" ")[1];
    const verifyUser: TTokenPayload = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as TTokenPayload;
    const user: IUser = await this.userRepository.findOne({ _id: verifyUser.userId }, { _id: 1 })
    if (!user) return createHttpError.Unauthorized("کاربری یافت نشد");
    req.user = user.id
    return next();
}


export {
    invoiceNumberGenerator,
    checkRole,
    verifyToken,
    randomNumber
}