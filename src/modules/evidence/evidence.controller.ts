import { BadRequest } from 'http-errors';
import { NextFunction, Request, Response } from "express";
import { RequestDto } from "./dto/evidence.dto";
import { EvidenceService } from "./evidence.service";
import { isBoolean } from "class-validator";
import { IUser } from '../user/model/user.model';

class EvidenceController {
    async add(req: Request & { user: IUser }, res: Response, next: NextFunction) {
        try {
            const userID: string = req.user._id;
            const addDto: RequestDto = req.body
            const result = await EvidenceService.addRequestForAdmin(addDto, userID);
            return res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        const result = await EvidenceService.readAllEvidence()
        return res.status(200).json(result)
    }

    async changeStatus(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { status } = req.body;
        if (!isBoolean(status)) throw BadRequest("وضعیت ارسال شده صحیح نمیباشد")
        const result = await EvidenceService.changeStatusEvidence(id, status)
        return res.status(200).json(result)
    }
}

const evidenceController = new EvidenceController()

export {
    evidenceController as EvidenceController
}