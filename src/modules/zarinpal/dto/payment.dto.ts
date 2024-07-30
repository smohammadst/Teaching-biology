import { IsArray, IsString } from "class-validator";

export class PaymentDto {
    @IsArray()
    bascket: Array<{
        id: string,
        count: number
    }>
}

export class UpdateDto {
    @IsArray()
    listProduct: Array<string>
}

export class CheckDto {
    @IsString()
    code: string
}