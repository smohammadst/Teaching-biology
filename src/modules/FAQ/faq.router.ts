import { Router } from "express";
import { FaqController } from "./faq.controller";

const faqController = new FaqController()

export default (router: Router) => {
    router.post("/create", faqController.create)
    router.delete("/delete", faqController.delete)
}
