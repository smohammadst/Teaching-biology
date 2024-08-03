import { NextFunction, Request, Response } from "express"
import { SliderDto } from "./dto/slider.dto"
import { SliderSevice } from "./slider.service"

class SliderController {
    async addSlider(req: Request, res: Response, next: NextFunction) {
        try {
            const body: SliderDto = req.body
            const result = await SliderSevice.addSlider(body)
            return res.status(201).json(result)
        } catch (error) {
            next(error)

        }
    }
    async getAllSlider(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await SliderSevice.getSlider()
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async removeSlider(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await SliderSevice.removeSlider(id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

const sliderController = new SliderController()

export{
    sliderController as SliderController
}