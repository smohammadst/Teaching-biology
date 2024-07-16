import { IsEmpty, IsNotEmptyObject, isObject, IsObject, IsString, Length, MaxLength, ValidationError } from "class-validator";


export class ChapterDto{

    id: string
    @IsString()
    //@IsEmpty()
    title: string;


    //@IsEmpty()
    @IsNotEmptyObject()
    @IsObject()
    time: {hour:number, min:number}
}
