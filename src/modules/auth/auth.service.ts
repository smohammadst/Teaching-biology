import { AuthEnumMethod } from './enum/method.enum';
import { AuthDto, ChangePasswordDto } from "./dto/aurh.dto";
import { AuthEnumType } from "./enum/type.enum";
import { IUser, UserModel } from '../user/model/user.model';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";

import { sendEmail } from './../../common/functions/sendEmail';
import { sendSMS } from './../../common/functions/sendSmsPhone';
import { TTokenPayload } from './../../common/types/token.type';
import { isEmail, isMobilePhone, isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { randomInt } from 'node:crypto'
import { randomNumber } from './../../common/functions/globalFunction';

class AuthService {
    constructor(
        private userRepository = UserModel<IUser>
    ) { }

    async register(method: AuthEnumMethod, username: string, password?: string): Promise<object> {
        const validate: string = this.usernameValidation(method, username)
        let user: IUser = await this.userExist(method, validate);
        if (user) throw Conflict(AuthMessageError.Confirm)
        const code = randomNumber()
        console.log("dfsesd");
        if (password) {
            user = await this.userRepository.create({
                [method]: username,
                password: this.hashingPassword(password),
                otp: {
                    code,
                    expirseIn: 60 * 60 * 120
                }
            })
        } else {
            user = await this.userRepository.create({
                [method]: username,
                otp: {
                    code,
                    expirseIn: 60 * 60 * 120
                }
            })
        }

        // await sendSMS(user.phone, "کد یکبار مصرف شما : ${code} میباشد")
        return { message: "شما ثبت نام گردیدید" }
    }

    async loginPassword(method: AuthEnumMethod, username: string, password: string): Promise<string> {
        const validate: string = this.usernameValidation(method, username)
        let user: IUser = await this.userExist(method, validate)
        if (!user) throw NotFound(AuthMessageError.NotFound)
        const comparePassword = this.comparePassword(password, user.password)
        if (!comparePassword) throw Unauthorized(AuthMessageError.UnauthorizedPassword)
        if (!user.isvalidateMobile || !user.isValidateEmail)
            throw Unauthorized(AuthMessageError.UnauthorizedEmailAndPhone)
        let token
        token = this.createToken({ userId: user._id })
        return token
    }

    hashingPassword(password: string): string {
        const salt = 6;
        const hashPassword = bcrypt.hashSync(password, salt);
        //const hashPassword = ""

        return hashPassword;
    }

    comparePassword(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(password, hashPassword);
        //return true
    }

    async checkOtp(method: AuthEnumMethod, code: number, username: string): Promise<object> {
        const validate: string = this.usernameValidation(method, username)
        const user = await this.userExist(method, validate);
        if (user.otp.code != code) throw Unauthorized(AuthMessageError.UnauthorizedCode)
        const date = new Date
        if (+date > user.otp.expiresIn) throw Unauthorized(AuthMessageError.UnauthorizedExpires)
        const token = await this.createToken({ userId: "" + user.id })
        const refreshToken = await this.createToken({ userId: "" + user.id })
        return { token, refreshToken }
    }

    async createToken(payload: TTokenPayload) {
        const token = sign(payload,
            process.env.SECRET_KEY_TOKEN, { expiresIn: "1h" })
        return token;
    }

    userExistence(authDto: AuthDto) {
        const { username, method, type, password, code } = authDto;
        switch (type) {
            case AuthEnumType.register:
                return this.register(method, username, password)
            case AuthEnumType.loginPassword:
                return this.loginPassword(method, username, password)
            case AuthEnumType.resetCodePhone:
                return this.sendPhoneCode(method, username);
            case AuthEnumType.restCodeEmail:
                return this.sendEmailCode(method, username)
            case AuthEnumType.loginOtp:
                return this.checkOtp(method, code, username)
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
        if (!user) throw NotFound(AuthMessageError.NotFound);
        if (!this.comparePassword(oldPassword, user.password)) throw Conflict(AuthMessageError.Confirm)
        user.password = this.hashingPassword(newPassword);
        await user.save();
        return true;
    }

    async sendEmailCode(method: AuthEnumMethod, email: string): Promise<object> {
        const user: IUser = await this.userExist(method, email);
        if (!user) throw NotFound(AuthMessageError.NotFound)
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
        if (!user) throw NotFound(AuthMessageError.NotFound)
        const code = await this.genareteCodeAndUpdateUserOtp(method, phone)
        const text: string = `کد:${code}`
        const statusSendSms = sendSMS(user.phone, text)
        if (!statusSendSms) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return {
            message: "کد یکبار مصرف ارسال شد"
        }
    }

    async genareteCodeAndUpdateUserOtp(method: AuthEnumMethod, username: string): Promise<number> {
        const user: IUser = await this.userExist(method, username);
        if (!user) throw NotFound(AuthMessageError.NotFound);
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
                throw BadRequest(GlobalMessageError.BadRequest)
            case AuthEnumMethod.phone:
                if (isMobilePhone(username, "fa-IR")) return username
                throw BadRequest(GlobalMessageError.BadRequest)
            case AuthEnumMethod.id:
                if (isMongoId(username)) return username
                throw BadRequest(GlobalMessageError.BadRequest)
            default:
                Unauthorized("username is not correct")
        }
    }

}
const AuthServices = new AuthService()
export {
    AuthServices as AuthService
}