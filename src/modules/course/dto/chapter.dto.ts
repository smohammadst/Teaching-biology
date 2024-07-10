import { IsEmpty, IsObject, IsString } from "class-validator";


export class ChapterDto{
    @IsString()
    @IsEmpty()
    title: string;

    @IsEmpty()
    @IsString()
    text: string;

    @IsEmpty()
    @IsObject()
    time: object
}