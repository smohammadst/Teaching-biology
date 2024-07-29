import { RegisterDto, LoginDto, CheckOtp, ResetCodeDto } from "./dto/aurh.dto";
import { IUser, UserModel } from '../user/model/user.model';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { sign } from "jsonwebtoken";
import { TTokenPayload } from './../../common/types/token.type';
import { isEmail, isMobilePhone, isMongoId } from 'class-validator';
import { randomNumber, VerifyRefreshToken } from './../../common/functions/globalFunction';

class AuthService {
    constructor(
        private readonly userRepository = UserModel<IUser>
    ) { }
    async register(registerDto: RegisterDto) {
        const { email, phone, first_name, last_name } = registerDto;
        const existPhone = await this.userExist(phone)
        const existEmail = await this.userExist(null, email)
        if (existEmail || existPhone) throw Conflict(AuthMessageError.Confirm)
        const code = randomNumber()
        const createUser: IUser = await this.userRepository.create({
            email,
            phone,
            first_name,
            last_name,
            otp: {
                code,
                expiresIn: 120000
            }
        })
        if (!createUser) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { status: 201, message: "شما با موفقیت ثبت نام شدید" }
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
        const { phone } = restCodeDto;
        const userExist = await this.userExist(phone)
        if (!userExist) throw NotFound(AuthMessageError.NotFound)
        return await this.generateCodeAndUpdateUserOtp(userExist)
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

    async refreshToken(token: string) {
        const verifyRefreshToken: string = await VerifyRefreshToken(token)
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
        return { status: 200, message: "کد با موفقیت برای شما ارسال شد" }
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