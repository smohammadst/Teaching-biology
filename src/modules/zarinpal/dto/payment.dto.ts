import { IsArray } from "class-validator";

export class PaymentDto {
    @IsArray()
    bascket: Array<{
        id: string,
        installment: boolean
    }>
}