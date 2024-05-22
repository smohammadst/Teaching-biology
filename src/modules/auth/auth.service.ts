import { AuthEnumMethod } from './enum/method.enum';
import { AuthDto } from "./dto/aurh.dto";
import { AuthEnumType } from "./enum/type.enum";
import { IUser, UserModel } from '../user/model/user.model';
import createHttpError from 'http-errors';
import { randomInt } from 'crypto';
import { AuthMessageError } from 'src/common/enums/message.enum';
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class AuthService {
    constructor(
        private userRepository = UserModel<IUser>
    ) { }
    async register(method: AuthEnumMethod, username: string, password: string): Promise<boolean> {
        let user: IUser = await this.userExist(method, username);
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
        let user: IUser = await this.userExist(method, username)
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound)
        const comparePassword = this.comparePassword(password, user.password)
        if (!comparePassword) throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedPassword)
        if (!user.isvalidateMobile || !user.isValidateEmail)
            throw createHttpError.Unauthorized(AuthMessageError.UnauthorizedEmailAndPhone)
        let token: string
        if (user.email)
            token = this.createToken({ email: username })
        else if (user.phone)
            token = this.createToken({ phone: username })
        return token
    }
    hashingPassword(password: string): string {
        const salt = 6;
        const hashPassword = bcrypt.hashSync(password, salt)
        return hashPassword
    }
    comparePassword(password: string, hashPassword: string): boolean {
        return bcrypt.compareSync(password, hashPassword)
    }
    async loginOtp(method: AuthEnumMethod, username: string): Promise<boolean> {
        let user: IUser = await this.userExist(method, username)
        if (!user) throw createHttpError.NotFound(AuthMessageError.NotFound)
        const code = randomInt(5, 5)
        const otp = {
            code,
            expiresIn: 60 * 60 * 120
        }
        user.updateOne({ $set: { otp } })
        user.save()
        return true
    }
    async checkOtp(code: number, username: string) {
    }
    async chanchPassword() {

    }
    createToken(payload: object) {
        const token = Jwt.sign(payload,
            process.env.SECRET_KEY_TOKEN, { expiresIn: "1h" }
        )
        return token;
    }
    async accessToken() {

    }
    userExistence(authDto: AuthDto) {
        const { username, method, type, password } = authDto;
        switch (type) {
            case AuthEnumType.register:
                return this.register(method, username, password)
            case AuthEnumType.loginOtp:
                return this.loginOtp(method, username)
            case AuthEnumType.loginPassword:
                return this.loginPassword(method, username, password)
            default:
                break;
        }
    }
    async userExist(methode: AuthEnumMethod, username: string) {
        let user: IUser;
        switch (methode) {
            case AuthEnumMethod.username:
                user = await this.userRepository.findOne({ username })
                return user
            case AuthEnumMethod.email:
                user = await this.userRepository.findOne({ email: username })
                return user
            case AuthEnumMethod.phone:
                user = await this.userRepository.findOne({ phone: username })
                return user
        }
    }
}