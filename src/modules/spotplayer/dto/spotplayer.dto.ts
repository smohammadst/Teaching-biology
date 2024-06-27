import { IsArray, IsMongoId, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class SpotPlayerDto {
    @IsArray()
    courseID: Array<string>
    userID: string
    @IsString()
    authority: string
}