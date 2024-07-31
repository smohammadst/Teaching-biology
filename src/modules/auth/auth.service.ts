import { RegisterDto, LoginDto, CheckOtp, ResetCodeDto, TokenDto } from "./dto/aurh.dto";
import { IUser, UserModel } from '../user/model/user.model';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { sign } from "jsonwebtoken";
import { TTokenPayload } from './../../common/types/token.type';
import { isEmail, isMobilePhone, isMongoId } from 'class-validator';
import { randomNumber, VerifyRefreshToken } from './../../common/functions/globalFunction';
import { CodeEnumMethod } from "./enum/method.enum";
import mongoose, { Model } from "mongoose";

class AuthService {
    constructor(
        private readonly userRepository = UserModel<IUser>
    ) { }

    async registerStepOne(phone: string) {
        const existPhone = await this.userExist(phone)
        if (existPhone) throw Conflict(AuthMessageError.Confirm)
        const createUser: IUser = await this.userRepository.create({
            phone,
        })
        if (!createUser) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return await this.generateCodeAndUpdateUserOtp(createUser)
    }

    async registerStepTwo(registerDto: RegisterDto, userID: string) {
        const { first_name, last_name, email } = registerDto;
        const user = await this.userRepository.findOne({ _id: userID });
        if (!user) throw NotFound(AuthMessageError.NotFound)
        const updateUser = await user.updateOne({
            $set: {
                first_name,
                last_name,
                email
            }
        })
        if (updateUser.modifiedCount == 0) throw NotFound(GlobalMessageError.ServiceUnavailable)
        await updateUser.save()
        // const token = await this.createToken({ userId: user._id }, "1h")
        // const refreshToken = await this.createToken({ userId: user._id }, "1y")
        return { message: "اطلاعات شما ثبت گردید" }
    }

    async loginOtp(loginDto: LoginDto) {
        const { phone } = loginDto
        const existUser = await this.userExist(phone)
        if (!existUser) throw NotFound(AuthMessageError.NotFound)
        return await this.generateCodeAndUpdateUserOtp(existUser)
    }

    async checkOtp(checkDto: CheckOtp) {
        const { phone, code } = checkDto
        const existUser = await this.userRepository.findOne({ phone })
        if (!existUser) throw NotFound(AuthMessageError.NotFound)
        if (code !== existUser.otp.code) throw Unauthorized(AuthMessageError.UnauthorizedCode)
        const date = Date.now()
        if (existUser.otp.expiresIn < date) throw Unauthorized(AuthMessageError.UnauthorizedExpires)
        const token = await this.createToken({ userId: existUser._id }, "1h")
        const refreshToken = await this.createToken({ userId: existUser._id }, "1y")
        return { token, refreshToken }
    }

    async resetCode(restCodeDto: ResetCodeDto) {
        const { phone, method } = restCodeDto;
        switch (method) {
            case CodeEnumMethod.register:
                await this.registerStepOne(phone)
                const existUser = await this.userExist(phone)
                if (!existUser) throw NotFound(AuthMessageError.NotFound)
                return await this.generateCodeAndUpdateUserOtp(existUser)
            case CodeEnumMethod.login:
                const userExist = await this.userExist(phone)
                if (!userExist) throw NotFound(AuthMessageError.NotFound)
                return await this.generateCodeAndUpdateUserOtp(userExist)
            default:
                throw BadRequest("kir tosh")
        }

    }

    async sendPhoneCode(code: string) {
        const text: string = `کد:${code}`
        // const statusSendSms = sendSMS(user.phone, text)
        if (!true) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return {
            message: "کد یکبار مصرف ارسال شد",
            code
        }
    }

    async refreshToken(tokenDto: TokenDto) {
        const { token } = tokenDto
        const verifyRefreshToken: any = await VerifyRefreshToken(token)
        const generateToken = await this.createToken({ userId: verifyRefreshToken }, "1h")
        const generateRefreshToken = await this.createToken({ userId: verifyRefreshToken }, "1y")
        return { token: generateToken, refreshToken: generateRefreshToken }
    }

    async createToken(payload: TTokenPayload, expiresIn: string) {
        const token = sign(payload,
            process.env.SECRET_KEY_TOKEN, { expiresIn })
        return token;
    }

    async generateCodeAndUpdateUserOtp(user: IUser) {
        const code = randomNumber()
        const updateUser = await user.updateOne(
            {
                $set: { otp: { code, expirseIn: 12000 } }
            }
        )
        if (updateUser.modifiedCount == 0) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        await user.save()
        return { message: "کد با موفقیت برای شما ارسال شد", code }

    }

    async usernameValidation(phone?: string, email?: string) {
        if (email) {
            if (isEmail(email)) return email
            throw BadRequest(GlobalMessageError.BadRequest)
        } else if (phone) {
            if (isMobilePhone(phone, "fa-IR")) return phone
            throw BadRequest(GlobalMessageError.BadRequest)
        } else {
            throw BadRequest(GlobalMessageError.BadRequest)
        }
    }

    async userExist(phone?: string, email?: string, id?: string): Promise<IUser> {
        let user: IUser;
        if (email) {
            user = await this.userRepository.findOne({ email })
            return user
        } else if (phone) {
            user = await this.userRepository.findOne({ phone })
            return user
        } else if (id) {
            user = await this.userRepository.findOne({ _id: id })
            return user
        }
    }
}
const AuthServices = new AuthService()

export {
    AuthServices as AuthService
}