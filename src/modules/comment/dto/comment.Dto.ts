import { IsEmail, IsEmpty, IsEnum, IsMongoId, IsNumber, IsString } from "class-validator";
import { TypeEnumComment, TypeEnumSned } from "../enum/typeComment.enum";

export class CommentDto {
    @IsEmpty()
    @IsMongoId()
    ID: string
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
}