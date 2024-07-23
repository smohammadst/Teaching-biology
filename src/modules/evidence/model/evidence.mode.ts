import mongoose, { Document, ObjectId } from "mongoose";
import { statusEnum } from "src/common/enums/status.enum";

interface IEvidence extends Document {
    title: string,
    description: string,
    status: string,
    urlDownload: string,
    courseID: ObjectId,
    userID: ObjectId
}

const evidenceSchema = new mongoose.Schema<IEvidence>({
    title: { type: String },
    description: { type: String },
    urlDownload: { type: String },
    status: { type: String, default: statusEnum.pending },
    courseID: { type: mongoose.Types.ObjectId, ref: "course" },
    userID: { type: mongoose.Types.ObjectId, ref: "user" }
});

const EvidenceModel = mongoose.model("evidence", evidenceSchema);

export {
    IEvidence,
    EvidenceModel
}