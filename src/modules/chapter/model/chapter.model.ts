import mongoose,  { ObjectId } from 'mongoose'

interface IChapter extends mongoose.Document{
    title:string,
    text:string,
    time:object,

}

const chaptergSchema = new mongoose.Schema<IChapter>({
    title: {type: String},
    text: {type: String},
    time: {
        hour: Number,
        min: Number
    }

})

const ChapterModel = mongoose.model<IChapter>("chapter", chaptergSchema)

export{
    ChapterModel,
    IChapter
}
