import mongoose, { ObjectId } from "mongoose";

interface IDataSpotPlayer extends mongoose.Document {
    token: string,
    courseID: ObjectId,
    url: string,
    userID: ObjectId,
    idSpotPlayer: string
}
const dataSpotPlayerSchema = new mongoose.Schema<IDataSpotPlayer>({
    token: { type: String },
    courseID: { type: mongoose.Types.ObjectId, ref: "course" },
    url: { type: String },
    userID: { type: mongoose.Types.ObjectId, ref: "user" },
    idSpotPlayer: { type: String }
})

interface ISpotPlayer extends mongoose.Document {
    user: ObjectId,
    spotPlayer: Array<ObjectId>,
    idSP: string,
    authority: string
}

const spotPlayerSchema = new mongoose.Schema<ISpotPlayer>({
    user: { type: mongoose.Types.ObjectId, default: "" },
    spotPlayer: { type: [mongoose.Types.ObjectId], ref: "dataspotPlayer" },
    idSP: { type: String, default: '' },
    authority: { type: String, default: '' }
})

const DataSpotPlayerModel = mongoose.model<IDataSpotPlayer>("dataspotPlayer", dataSpotPlayerSchema)
const SpotPlayerModel = mongoose.model<ISpotPlayer>("spotplayer", spotPlayerSchema)

export {
    DataSpotPlayerModel,
    SpotPlayerModel,
    ISpotPlayer,
    IDataSpotPlayer
}