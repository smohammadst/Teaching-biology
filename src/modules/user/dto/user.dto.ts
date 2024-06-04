import { IsString } from "class-validator";

export class UserDto {
    @IsString()
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
}