import { IsEnum, IsMongoId, IsString } from "class-validator";
import { TypeFaq } from "../model/faq.model";

export class FaqDto {
    @IsMongoId()
    courseID:string
    
    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsEnum(TypeFaq)
    type: TypeFaq
}