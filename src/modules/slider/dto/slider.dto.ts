import { IsArray, IsEmpty, IsString } from "class-validator";

export class SliderDto {
    @IsArray()
    images: Array<string>

    @IsEmpty()
    @IsString()
    title: string
    @IsEmpty()
    @IsString()
    subtitle: string
    @IsEmpty()
    @IsString()
    description: string
    @IsEmpty()
    @IsString()
    url: string
}