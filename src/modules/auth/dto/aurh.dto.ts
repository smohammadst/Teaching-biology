import { IsEnum, IsString } from "class-validator";
import { AuthEnumType } from "../enum/type.enum";
import { AuthEnumMethod } from "../enum/method.enum";

export class AuthDto {
    @IsString()
    username: string
    @IsString()
    password?: string
    @IsEnum(AuthEnumType)
    type: AuthEnumType
    @IsEnum(AuthEnumMethod)
    method: AuthEnumMethod
}