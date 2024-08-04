import { IsEnum, IsString } from "class-validator";
import { TypeFaq } from "../model/faq.model";

export class FaqDto {

    @IsString()
    question: string;

    @IsString()
    answer: string;

    @IsEnum(TypeFaq)
    type: TypeFaq
}