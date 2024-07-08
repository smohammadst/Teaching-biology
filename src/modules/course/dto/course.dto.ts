import { IsArray, IsBoolean, IsNumber, IsObject, IsString } from "class-validator";


export class CourseDto {
    @IsString()
    title:string;
    @IsString()
    Description:string;
    @IsString()
    shortText:string;
    @IsNumber()
    price: number;
    @IsNumber()
    discount: number;
    @IsNumber()
    priceAfterDiscount: number;
    @IsArray()
    category: Array<string>;
    @IsArray()
    images: Array<string>;
    @IsArray()
    comments: Array<string>;
    @IsArray()
    faq: Array<string>;
    @IsObject()
    neededTime: object;
    @IsNumber()
    sortByNumber: number;
    @IsString()
    language: string;
    @IsString()
    prerequisitesText: string;
    @IsArray()
    prerequisites: Array<string>;
    @IsObject()
    owner: object
}