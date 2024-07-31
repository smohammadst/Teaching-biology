import { IsMobilePhone } from 'class-validator';
import { IsString } from 'class-validator';
export class TiketDto{
    @IsString()
    title: string
    @IsString()
    desc: string
    @IsMobilePhone("fa-IR")
    phone: string
}