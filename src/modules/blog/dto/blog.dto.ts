import { IsArray, IsBoolean, IsEmpty, IsMongoId, IsString, isArray } from "class-validator";
import { ObjectId } from "mongoose";

export class BlogDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsString()
    shortText: string;
    @IsBoolean()
    status: boolean;
    @IsArray()
    comment: Array<string>;
    @IsArray()
    category: Array<string>;
    @IsArray()
    images: Array<string>;
    @IsString()
    shortLink: string;
    @IsArray()
    latest:Array<string>
}

export class UpdateBlogDto extends BlogDto{
    @IsMongoId()
    id: string
}
