import { IsArray, IsBoolean, IsEmpty, IsNumber, IsObject, IsString, MinLength } from "class-validator";
import { ObjectId } from "mongoose";


export class CourseDto {
    @IsString()
    //@IsEmpty()
    title: string;

    //@IsEmpty()
    @IsString()
    @MinLength(3)
    Description: string;

    //@IsEmpty()
    @IsString()
    shortText: string;

    //@IsEmpty()
    @IsNumber()
    price: number;

    //@IsEmpty()
    @IsNumber()
    discount: number;

    //@IsEmpty()
    @IsNumber()
    priceAfterDiscount: number;

    //@IsEmpty()
    category: ObjectId;

    //@IsEmpty()
    @IsArray()
    images: Array<string>;

    //@IsEmpty()
    @IsArray()
    comments: Array<string>;

    //@IsEmpty()
    @IsArray()
    faq: Array<string>;

    //@IsEmpty()
    @IsObject()
    neededTime: { hour: number, min: number };

    //@IsEmpty()
    @IsNumber()
    sortByNumber: number;

    //@IsEmpty()
    @IsString()
    language: string;

    //@IsEmpty()
    @IsString()
    prerequisitesText: string;

    //@IsEmpty()
    @IsArray()
    prerequisites: string[];

    //@IsEmpty()
    @IsObject()
    owner: { name: string, image: string };

    @IsString()
    level: string
    @IsString()
    type: string

    @IsObject()
    rating: { rate: number, count: number }
}

export class CodeDto {
    @IsString()
    code: string
    @IsString()
    discount: string
}