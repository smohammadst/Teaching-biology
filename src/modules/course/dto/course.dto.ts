import { IsArray, IsBoolean, IsEmpty, IsNumber, IsObject, IsString, MinLength } from "class-validator";


export class CourseDto {
    @IsString()
    @IsEmpty()
    title:string;

    @IsEmpty()
    @IsString()
    @MinLength(3)
    Description:string;

    @IsEmpty()
    @IsString()
    shortText:string;

    @IsEmpty()
    @IsNumber()
    price: number;

    @IsEmpty()
    @IsNumber()
    discount: number;

    @IsEmpty()
    @IsNumber()
    priceAfterDiscount: number;

    @IsEmpty()
    @IsArray()
    category: Array<string>;

    @IsEmpty()
    @IsArray()
    images: Array<string>;

    @IsEmpty()
    @IsArray()
    comments: Array<string>;

    @IsEmpty()
    @IsArray()
    faq: Array<string>;

    @IsEmpty()
    @IsObject()
    neededTime: object;

    @IsEmpty()
    @IsNumber()
    sortByNumber: number;

    @IsEmpty()
    @IsString()
    language: string;

    @IsEmpty()
    @IsString()
    prerequisitesText: string;

    @IsEmpty()
    @IsArray()
    prerequisites: Array<string>;

    @IsEmpty()
    @IsObject()
    owner: object
}