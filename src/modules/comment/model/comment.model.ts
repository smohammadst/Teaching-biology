import mongoose, { ObjectId } from "mongoose";
import { statusEnum } from "./../../../common/enums/status.enum";



interface IComment extends mongoose.Document {
    userID?: ObjectId,
    blogID?: ObjectId,
    courseID?: ObjectId,
    text: string,
    answer?: Array<IAnswer>,
    star?: number,
    status: string,
}

interface IAnswer extends mongoose.Document {
    userID?: ObjectId,
    commentID: ObjectId,
    text: string,
    status: string
}

const commentSchema = new mongoose.Schema<IComment>({
    userID: { type: mongoose.Types.ObjectId, ref: "user" },
    blogID: { type: mongoose.Types.ObjectId, ref: "blog" },
    courseID: { type: mongoose.Types.ObjectId, ref: "course"  },
    text: { type: String, required: true },
    answer: { type: [mongoose.Types.ObjectId], ref: "answer" },
    star: { type: Number, max: 5 },
    status: { type: String, default: statusEnum.pending },
}, {
    timestamps: { createdAt: true, updatedAt:true }
})

const answerSchema = new mongoose.Schema<IAnswer>({
    userID: { type: mongoose.Types.ObjectId, ref: "user" },
    commentID: { type: mongoose.Types.ObjectId, ref: "comment" },
    text: { type: String, required: true },
    status: { type: String, default: statusEnum.pending }
}, {
    timestamps: { createdAt: true, updatedAt:true }
})

const CommentModel = mongoose.model("comment", commentSchema)
const AnswerModel = mongoose.model("answer", answerSchema)

export {
    CommentModel,
    AnswerModel,
    IAnswer,
    IComment,
}