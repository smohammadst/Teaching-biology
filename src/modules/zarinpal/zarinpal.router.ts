import { Router } from "express"
import { PaymentController } from "./zarinpal.contoller"

export default (router: Router) => {
    router.post("/basket", PaymentController.bascket)
    router.post("/basket/update", PaymentController.updateBasket)
    router.get("/basket/getInformation", PaymentController.getAuthority)
    router.post("/checkCode", PaymentController.checkCode)
}