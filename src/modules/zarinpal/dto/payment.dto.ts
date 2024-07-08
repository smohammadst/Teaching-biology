import { IsArray } from "class-validator";

export class PaymentDto {
    @IsArray()
    bascket: Array<string>
}