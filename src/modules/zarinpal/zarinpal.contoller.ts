import { Request, Response, NextFunction } from "express";
import { CheckDto, PaymentDto, UpdateDto } from "./dto/payment.dto";
import { PaymentService } from "./zarinpal.service";
import { IUser } from "../user/model/user.model";

class PaymentController {
    async bascket(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const bascketDto: PaymentDto = req.body
            const userID = req.user._id
            const result = await PaymentService.PaymentGateway(bascketDto, userID)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async updateBasket(req: Request, res: Response, next: NextFunction) {
        try {
            const body: UpdateDto = req.body
            const result = await PaymentService.updateBasket(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async checkCode(req: Request, res: Response, next: NextFunction) {
        try {
            const body: CheckDto = req.body
            const result = await PaymentService.checkCodeDiscount(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getAuthority(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const { authority } = req.params
            const user = req.user
            const result = await PaymentService.getAuthority(authority, user._id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

const paymentController = new PaymentController()

export {
    paymentController as PaymentController
}