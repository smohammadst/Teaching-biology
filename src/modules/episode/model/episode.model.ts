import mongoose from 'mongoose'

interface IEpisode extends mongoose.Document{
    title:string,
    text:string,
    time: {
        min: number,
        second: number
    }

}

const episodeSchema = new mongoose.Schema<IEpisode>({
    title: {type: String},
    text: {type: String},
    time: {
        min: Number,
        second: Number
    }

})

const EpisodeModel = mongoose.model<IEpisode>("episode", episodeSchema)

export{
    EpisodeModel,
    IEpisode
}
