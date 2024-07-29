import { IsEmail, IsEmpty, IsEnum, IsMobilePhone, IsMongoId, IsNumber, IsString } from "class-validator";

export class RegisterDto {
    @IsString()
    first_name: string
    @IsString()
    last_name: string
    @IsString()
    email: string
    @IsMobilePhone("fa-IR")
    phone: string
}

export class LoginDto {
    @IsMobilePhone("fa-IR")
    phone: string
}

export class CheckOtp {
    @IsMobilePhone("fa-IR")
    phone: string
    @IsString()
    code?: string
}

export class ResetCodeDto {
    @IsMobilePhone("fa-IR")
    phone: string
}
