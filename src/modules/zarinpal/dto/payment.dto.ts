import { IsArray, IsEmpty, IsString } from "class-validator";

export class PaymentDto {
    @IsArray()
    bascket: Array<{
        id: string
    }>
}

export class UpdateDto {
    @IsEmpty()
    @IsArray()
    listProduct: Array<string>
}

export class CheckDto {
    @IsString()
    code: string
}