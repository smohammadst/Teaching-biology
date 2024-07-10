import createHttpError from "http-errors";
import { IUser, UserModel } from "src/modules/user/model/user.model";
import { AuthMessageError, NotFoundError } from "../enums/message.enum";
import { Request } from "express";
import moment from "moment-jalali"

async function checkRole(req: Request, role: Array<string>) {
    const userID = req.user
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

function invoiceNumberGenerator(): string {
    return (
        moment().format("jYYYYjMMjDDHHmmssSSS") +
        String(process.hrtime()[1]).padStart(9)
    );
}


export {
    invoiceNumberGenerator,
    checkRole
}