import { IsArray, IsNumber, IsString } from "class-validator";

export class PlanDto {
    @IsNumber()
    time: number
    @IsArray()
    listAmount: []
    @IsNumber()
    sum: number
    @IsString()
    name: string
}