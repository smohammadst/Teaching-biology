import { AuthEnumMethod } from './enum/method.enum';
import { AuthDto, ChangePasswordDto } from "./dto/aurh.dto";
import { AuthEnumType } from "./enum/type.enum";
import { IUser, UserModel } from '../user/model/user.model';
import createHttpError from 'http-errors';
import { randomInt } from 'crypto';
import { AuthMessageError, GlobalMessageError } from 'src/common/enums/message.enum';
import Jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from 'src/common/functions/sendEmail';
import { sendSMS } from 'src/common/functions/sendSmsPhone';
import { TTokenPayload } from 'src/common/types/token.type';
import { isEmail, isMobilePhone, isMongoId, isString } from 'class-validator';
import { NextFunction, Request } from 'express';
import { Model } from 'mongoose';

export class AuthService {
    constructor(
        private userRepository = Model<IUser>
    ) { }

    async register(method: AuthEnumMethod, username: string, password: string): Promise<boolean> {
        const validate: string = this.usernameValidation(method, username)
        let user: IUser = await this.userExist(method, validate);
        if (user) throw createHttpError.Conflict(AuthMessageError.Confirm)
        const code = randomInt(5, 5)
        user = await this.userRepository.create({
            [method]: username,
            password: this.hashingPassword(password),
            otp: {
                code,
                expirseIn: 60 * 60 * 120
            }
        })
        return true
    }

    async loginPassword(method: AuthEnumMethod, username: string, password: string): Promise<string> {
        const validate: string = this.usernameValidation(method, username)
        let user: IUser = await this.userExist(method, validate)
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound)
        const comparePassword = this.comparePassword(password, user.password)
        if (!comparePassword) throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedPassword)
        if (!user.isvalidateMobile || !user.isValidateEmail)
            throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedEmailAndPhone)
        let token: string
        token = this.createToken({ userId: user._id })
        return token
    }

    hashingPassword(password: string): string {
        const salt = 6;
        const hashPassword = bcrypt.hashSync(password, salt);
        return hashPassword;
    }

    comparePassword(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(password, hashPassword);
    }

    async checkOtp(method: AuthEnumMethod, code: number, username: string): Promise<object> {
        const validate: string = this.usernameValidation(method, username)
        const user = await this.userExist(method, validate);
        if (user.otp.code !== code) throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedCode)
        const date = new Date
        if (+date > user.otp.expiresIn) throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedExpires)
        const token = this.createToken({ userId: user._id })
        const refreshToken = this.createToken({ userId: user._id })
        return { token, refreshToken }
    }

    createToken(payload: TTokenPayload) {
        const token = Jwt.sign(payload,
            process.env.SECRET_KEY_TOKEN, { expiresIn: "1h" }
        )
        return token;
    }

    async verifyToken(req: Request, res: Response, next: NextFunction) {
        if (!req.headers['authorization']) return next(createHttpError.Unauthorized("دوباره تلاش کنید"));
        const authorization: string = req.headers["authorization"];
        const token: string = authorization.split(" ")[1];
        const verifyUser: TTokenPayload = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as TTokenPayload;
        const user: IUser = await this.userRepository.findOne({ _id: verifyUser.userId }, { _id: 1 })
        if (!user) return createHttpError.Unauthorized("کاربری یافت نشد");
        req.user = user;
        return next();
    }

    userExistence(authDto: AuthDto) {
        const { username, method, type, password } = authDto;
        switch (type) {
            case AuthEnumType.register:
                return this.register(method, username, password)
            case AuthEnumType.loginPassword:
                return this.loginPassword(method, username, password)
            case AuthEnumType.resetCodePhone:
                return this.sendPhoneCode(method, username);
            case AuthEnumType.restCodeEmail:
                return this.sendEmailCode(method, username)
            default:
                break;
        }
    }
    async userExist(methode: AuthEnumMethod, username: string): Promise<IUser> {
        let user: IUser;
        switch (methode) {
            case AuthEnumMethod.email:
                user = await this.userRepository.findOne({ email: username })
                return user
            case AuthEnumMethod.phone:
                user = await this.userRepository.findOne({ phone: username })
                return user
            case AuthEnumMethod.id:
                user = await this.userRepository.findOne({ _id: username })
                return user
        }
    }

    async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
        const { method, username, oldPassword, newPassword } = changePasswordDto
        const user: IUser = await this.userExist(method, username);
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound);
        if (!this.comparePassword(oldPassword, user.password)) throw createHttpError.Conflict(AuthMessageError.Confirm)
        user.password = this.hashingPassword(newPassword);
        await user.save();
        return true;
    }

    async sendEmailCode(method: AuthEnumMethod, email: string): Promise<object> {
        const user: IUser = await this.userExist(method, email);
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound)
        const code = await this.genareteCodeAndUpdateUserOtp(method, email);
        const from: string = process.env.ADMINEMAIL
        const to: string = user.email
        const subject: string = "رمز یک بار مصرف"
        const text: string = `کد : ${code}`
        const successMessage: object = sendEmail(from, to, subject, text)
        return successMessage

    }

    async sendPhoneCode(method: AuthEnumMethod, phone: string) {
        const user = await this.userExist(method, phone);
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound)
        const code = await this.genareteCodeAndUpdateUserOtp(method, phone)
        const text: string = `کد:${code}`
        const statusSendSms = sendSMS(user.phone, text)
        if (!statusSendSms) throw createHttpError.ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return {
            message: "کد یکبار مصرف ارسال شد"
        }
    }

    async genareteCodeAndUpdateUserOtp(method: AuthEnumMethod, username: string): Promise<number> {
        const user: IUser = await this.userExist(method, username);
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound);
        const code: number = randomInt(10000, 99999);
        const date: number = new Date().getTime() + 120000
        const otp: { code: number, expiresIn: number } = {
            code,
            expiresIn: date
        }
        user.otp = otp
        await user.save()
        return code
    }

    usernameValidation(methode: AuthEnumMethod, username: string) {
        switch (methode) {
            case AuthEnumMethod.email:
                if (isEmail(username)) return username
                throw createHttpError.BadRequest(GlobalMessageError.BadRequest)
            case AuthEnumMethod.phone:
                if (isMobilePhone(username, "fa-IR")) return username
                throw createHttpError.BadRequest(GlobalMessageError.BadRequest)
            case AuthEnumMethod.id:
                if (isMongoId(username)) return username
                throw createHttpError.BadRequest(GlobalMessageError.BadRequest)
            default:
                createHttpError.Unauthorized("username is not correct")
        }
    }

}