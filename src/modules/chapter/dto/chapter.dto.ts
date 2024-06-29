import { IsObject, IsString } from "class-validator";


export class ChapterDto{
    @IsString()
    title: string;
    @IsString()
    text: string;
    @IsObject()
    time: object
}