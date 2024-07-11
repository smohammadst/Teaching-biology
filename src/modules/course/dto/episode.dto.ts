import { IsEmpty, IsObject, IsString, MaxLength, maxLength, MinLength, minLength, } from "class-validator";


export class EpisodeDto{
    @IsString()
    //@IsEmpty()
    @MinLength(3)
    @MaxLength(200)
    title: string;


    @IsObject()
    //@IsEmpty()
    time: object
    chapterID: string
    courseID: string
}