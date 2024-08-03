import mongoose from "mongoose";

interface ISlider extends mongoose.Document {
    title: string,
    subtitle: string,
    description: string,
    images: Array<string>,
    url: string
}

const sliderSchema = new mongoose.Schema<ISlider>({
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    images: { type: [String], required: true },
    url: { type: String }
})

const SliderModel = mongoose.model("slider", sliderSchema)

export {
    ISlider,
    SliderModel
}