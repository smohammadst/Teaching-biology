import { IsArray, IsNumber, IsString } from "class-validator";


export class CourseDto {
    @IsString()
    title:string;
    @IsString()
    text:string;
    @IsString()
    shortText:string;
    @IsNumber()
    price: number;
    @IsNumber()
    discount: number;
    @IsNumber()
    finalPrice: number;
    @IsArray()
    category: Array<string>;
    @IsArray()
    images: Array<string>;
    @IsArray()
    comments: Array<string>;
    @IsArray()
    faq: Array<string>
}