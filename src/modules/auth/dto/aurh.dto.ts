import { IsEmail, IsEmpty, IsEnum, IsMobilePhone, IsMongoId, IsNumber, IsString } from "class-validator";
import { AuthEnumType } from "../enum/type.enum";
import { AuthEnumMethod } from "../enum/method.enum";

export class AuthDto {
    @IsString()
    username: string
    @IsEmpty()
    @IsString()
    password?: string
    @IsEnum(AuthEnumType)
    type: AuthEnumType
    @IsEnum(AuthEnumMethod)
    method: AuthEnumMethod
    @IsEmpty()
    @IsString()
    code?: string
    @IsEmpty()
    @IsString()
    first_name: string
    @IsEmpty()
    @IsString()
    last_name: string
}

export class ChangePasswordDto {
    @IsString()
    newPassword: string
    @IsString()
    oldPassword: string
    @IsString()
    username: string
    @IsEnum(AuthEnumMethod)
    method: AuthEnumMethod
}
