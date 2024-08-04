import { Router } from "express";
import { FaqController } from "./faq.controller";

const faqController = new FaqController()

export default (router: Router) => {
    router.post("/faq/create", faqController.create)
    router.delete("/faq/delete", faqController.delete)
}
