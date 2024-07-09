import { IsArray, IsEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { isValidObjectId, ObjectId } from "mongoose";

export class CategoryDto {

    @IsString()
    title: string;

    @IsString()
    parent: string;

    
}