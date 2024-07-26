import { Request, Response, NextFunction } from "express";
import { PaymentDto } from "./dto/payment.dto";
import { PaymentService } from "./zarinpal.service";
import { IUser } from "../user/model/user.model";

class PaymentController {
    async bascket(req: Request& {user: IUser}, res: Response, next: NextFunction) {
        try {
            const bascketDto: PaymentDto = req.body
            const userID = req.user._id
            const result = await PaymentService.PaymentGateway(bascketDto, userID)
        } catch (error) {
            next(error)
        }
    }
}

const paymentController = new PaymentController()

export{
    paymentController as PaymentController
}