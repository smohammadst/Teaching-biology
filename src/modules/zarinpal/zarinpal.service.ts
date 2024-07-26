import { IUser, UserModel } from "../user/model/user.model";
import { PaymentDto } from "./dto/payment.dto"
import { ICourse, CourseModel } from '../course/model/course.model';
import { Model, ObjectId } from 'mongoose';
import { IPayment, ISale, PaymentModel, SaleModel } from './model/zarinpal.model';
import axios from 'axios';
import createHttpError from 'http-errors';
import { invoiceNumberGenerator } from './../../common/functions/globalFunction';
import * as moment from "moment-jalali"
import { Response } from "express";
import { SpotPlayerService } from "../spotplayer/spotplayer.service";

class PaymentService {
    constructor(
        private courseRepository = CourseModel<ICourse>,
        private saleRepositoy = SaleModel<ISale>,
        private paymentRepository = PaymentModel<IPayment>,
        private userRepository = UserModel<IUser>
    ) { }
    async PaymentGateway(paymentDto: PaymentDto, userID: string): Promise<void> {
        const { bascket } = paymentDto;
        let amount: number = 0
        let listCourse: Array<{ course: ObjectId, count: number }> = []
        for (let i = 0; i < bascket.length; i++) {
            const id: string = bascket[i].id;
            const findCourse: ICourse = await this.courseRepository.findOne({ _id: id });
            if (findCourse) {
                listCourse.push({ course: findCourse._id, count: bascket[i].count });
                amount += (findCourse.priceAfterDiscount * bascket[i].count);
            }
        }
        const user: IUser = await this.userRepository.findOne({ _id: userID })
        if (!user) throw createHttpError.Unauthorized("کاربری یافت نشد")
        await this.zarinpal(user, listCourse, amount)
    }
    async zarinpal(user: IUser, listCourse: Array<{ course: ObjectId, count: number }>, amount: number): Promise<object> {
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
    async verifyPayment(res: Response, authority: string) {
        const verifyURL = "https://api.zarinpal.com/pg/v4/payment/verify.json";
        const payment = await this.paymentRepository.findOne({ authority });
        const sale = await this.saleRepositoy.findOne({ payment: payment._id })
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
        if (verifyResult.data.code == 100) {
            await this.updateSaleCourse(sale.courseID)
            await payment.updateOne({
                $set: {
                    verify: true,
                    saleID: sale._id,
                    refID: verifyResult.data.ref_id,
                    cardHash: verifyResult.data.card_hash
                }
            })
            return res.redirect("")
        }
        return res.redirect("")
    }
    async updateSaleCourse(listCourse: Array<{ course: ObjectId, count: number }>) {
        for (let i = 0; i < listCourse.length; i++) {
            await this.courseRepository.updateOne({ _id: listCourse[i].course },
                {
                    $inc: { sale: 1 }
                }
            )
        }
    }

    async getAuthority(authority: string, userID: string) {
        const payment = await this.paymentRepository.findOne({ authority });
        const sale = await this.saleRepositoy.findOne({ payment: payment._id });
        const tokens = await SpotPlayerService.getTokenSpotPlayerUser(userID)
        const course = sale.courseID
        const listCourse = []
        for (var i = 0; i < course.length; i++) {
            const findCourse = await this.courseRepository.findOne({ _id: course[i].course });
            if (findCourse) listCourse.push({
                title: findCourse.title,
                image: findCourse.images,
                priceAfterDiscount: findCourse.priceAfterDiscount,
                count: course[i].count,
                token:tokens
            })
        }
    }
}

const paymentService = new PaymentService()

export {
    paymentService as PaymentService
}