import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { TypeEnumComment, TypeEnumSned } from "../enum/typeComment.enum";

export class CommentDto {
    @IsEmpty()
    @IsMongoId()
    userID: string
    @IsEmpty()
    @IsMongoId()
    ID: string
    @IsString()
    title: string
    @IsString()
    text: string
    @IsNumber()
    star: number
    @IsEnum(TypeEnumComment)
    method: TypeEnumComment
    @IsEnum(TypeEnumSned)
    snedType: TypeEnumSned
    @IsMongoId()
    @IsEmpty()
    parent: string
    @IsEmpty()
    fullName: string
    @IsEmail()
    email: string
}