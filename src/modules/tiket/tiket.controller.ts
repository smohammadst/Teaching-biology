import { NextFunction, Request, Response } from "express";
import { TiketService } from "./tiket.service";
import { TiketDto } from "./dto/tiket.dto";

class TiketController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const body: TiketDto = req.body
            const result = await TiketService.create(body)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async read(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await TiketService.readAll()
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const result = await TiketService.remove(id)
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}

const tiketController = new TiketController()

export {
    tiketController as TiketController
}