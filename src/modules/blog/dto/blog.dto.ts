import { IsArray, IsBoolean, IsMongoId, IsString, isArray } from "class-validator";

export class BlogDto {
    @IsString()
    title: string;
    @IsString()
    text: string;
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
}

export class UpdateBlogDto extends BlogDto{
    @IsMongoId()
    id: string
}
