import { IUser } from "../user/model/user.model";
import { PaymentDto } from "./dto/payment.dto"
import { ICourse } from '../course/model/course.model';
import { Model } from 'mongoose';
import { IPayment, ISale } from './model/zarinpal.model';
import axios from 'axios';
import createHttpError from 'http-errors';
import { invoiceNumberGenerator } from 'src/common/functions/globalFunction';
import moment from "moment-jalali"

class PaymentService {
    constructor(
        private courseRepository: Model<ICourse>,
        private saleRepositoy: Model<ISale>,
        private paymentRepository: Model<IPayment>,
        private userRepository: Model<IUser>
    ) { }
    async PaymentGateway(paymentDto: PaymentDto, userID: string): Promise<void> {
        const { bascket } = paymentDto;
        let amount: number = 0
        let listCourse: Array<string> = []
        for (let i = 0; i < bascket.length; i++) {
            const id: string = bascket[i].id ;
            const findCourse: ICourse = await this.courseRepository.findOne({ _id: id });
            if (findCourse) {
                listCourse.push(findCourse._id);
                amount += findCourse.priceAfterDiscount;
            }
        }
        const user: IUser = await this.userRepository.findOne({ _id: userID })
        if (!user) throw createHttpError.Unauthorized("کاربری یافت نشد")
        await this.zarinpal(user, listCourse, amount)
    }
    async zarinpal(user: IUser, listCourse: Array<string>, amount: number): Promise<object> {
        const zarinpal_request_url =
            "https://api.zarinpal.com/pg/v4/payment/request.json";
        const zarinpalGatewayURL = "https://www.zarinpal.com/pg/StartPay";
        const description = "بابت خرید دوره یا محصولات";
        const zapripal_options = {
            merchant_id: process.env.ZARINPAL_MERCHANTID,
            amount: amount,
            description,
            metadata: {
                email: user?.email || "example@domain.com",
                mobile: user.phone,
            },
            callback_url: "https://saberzarei.iran.liara.run/api/payment/verify",
        };
        const RequestResult = await axios
            .post(zarinpal_request_url, zapripal_options)
            .then((result) => result.data);
        const { authority, code } = RequestResult.data;
        if (code == 100 && authority) {
            const payment = await this.paymentRepository.create({
                authority,
                amount,
                paymentData: moment().format("jYYYYjMMjDDHHmmss"),
                invoiceNumber: invoiceNumberGenerator(),
                verify: false,
                description
            });
            const sale = await this.saleRepositoy.create({
                userID: user._id,
                courseID: listCourse,
                payment: payment._id
            })
            return {
                statusCode: 200,
                code,
                gatewayURL: `${zarinpalGatewayURL}/${authority}`
            }
        }
    }
    async verifyPayment(authority: string) {
        const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        const payment = await this.paymentRepository.findOne({ authority });
        if (!payment) throw createHttpError.NotFound("تراکنش مورد انتظار یافت نشد")
        if (payment.verify) throw createHttpError.BadRequest("تراکنش مورد نظر قبلا پرداخت شده است")
        const verifyBody = JSON.stringify({
            authority,
            amount: payment.amount,
            merchant_id: process.env.ZARINPAL_MERCHANTID,
        });
        const verifyResult = await fetch(verifyURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: verifyBody,
        }).then((result) => result.json());
        if (verifyResult.data.code == 100){   
        }
    }
}