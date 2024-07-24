import { Router } from "express"
import { PaymentController } from "./zarinpal.contoller"

export default (router: Router) => {
    router.post("/bascket", PaymentController.bascket)
}