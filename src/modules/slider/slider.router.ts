import { Router } from "express";
import { SliderController } from "./slider.controller";

export default (router: Router) => {
    router.post("/slider/addSlider", SliderController.addSlider)
    router.get("/slider/getAll", SliderController.getAllSlider)
    router.delete("/slider/remove/:id", SliderController.removeSlider)
}