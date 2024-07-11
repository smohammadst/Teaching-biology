import { IsEmpty, IsObject, IsString } from "class-validator";


export class ChapterDto{

    id: string
    @IsString()
    //@IsEmpty()
    title: string;


    //@IsEmpty()
    @IsObject()
    time: object
}