import { IsArray, IsEmpty, IsString } from "class-validator";

export class SliderDto {
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
    @IsArray()
    images: Array<string>
}