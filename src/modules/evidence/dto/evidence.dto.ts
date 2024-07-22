import { IsMongoId } from "class-validator";

export class RequestDto {
    @IsMongoId()
    courseID: string
}