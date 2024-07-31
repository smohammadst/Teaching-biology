import { GlobalMessageError } from "src/common/enums/message.enum";
import { TiketDto } from "./dto/tiket.dto";
import { ITiket, TiketModel } from "./model/tiket.model";
import { ServiceUnavailable, NotFound } from "http-errors"
import { validateObjectID } from "src/common/functions/globalFunction";
class TiketService {
    constructor(
        private readonly tiketRepository = TiketModel<ITiket>
    ) { }

    async create(tiketDto: TiketDto) {
        const { title, desc, phone } = tiketDto
        const createTiket = await this.tiketRepository.create({
            title,
            desc,
            phone
        })
        if (!createTiket) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { message: "تیکت شما با موفقیت انجام شد در اصرع وقت با شما تماس میگیریم" }
    }

    async readAll() {
        const readTikets = await this.tiketRepository.find({})
        if (!readTikets) throw NotFound("تیکتی یافت نشد")
        return { readTikets }
    }

    async remove(id: string) {
        validateObjectID(id)
        const removeTiket = await this.tiketRepository.deleteOne({ _id: id })
        if (removeTiket.deletedCount == 0) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { message: "تیکت با موفقیت حذف گردید" }
    }
}

const tiketService = new TiketService()

export {
    tiketService as TiketService
}