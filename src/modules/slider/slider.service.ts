import { GlobalMessageError } from "./../../common/enums/message.enum";
import { SliderDto } from "./dto/slider.dto";
import { ISlider, SliderModel } from "./model/slider.model";
import { ServiceUnavailable, NotFound } from "http-errors"
import { validateObjectID } from "./../../common/functions/globalFunction";

class SliderSevice {
    constructor(
        private readonly sliderRepository = SliderModel<ISlider>
    ) { }

    async addSlider(sliderDto: SliderDto) {
        const { title, description, images, subtitle, url } = sliderDto;
        const create = await this.sliderRepository.create({
            title,
            subtitle,
            url,
            images,
            description
        })
        if (!create) throw ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return { message: "اسلایدر با موفقیت بارگزاری شد" }
    }

    async getSlider() {
        const getAll = await this.sliderRepository.find({})
        if (!getAll) throw NotFound("اسلایدری یافت نشد")
        return { getAll }
    }

    async removeSlider(id: string) {
        validateObjectID(id);
        const remove = await this.sliderRepository.deleteOne({ _id: id })
        if (remove.deletedCount == 0) throw NotFound("اسلایدری یافت نشد")
        return { message: "اسلایدر با موفقیت حذف گردید" }
    }
}

const sliderService = new SliderSevice()

export {
    sliderService as SliderSevice
}