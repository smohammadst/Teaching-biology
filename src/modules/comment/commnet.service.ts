import { ObjectId } from "mongoose";
import { IComment, CommentModel, AnswerModel, IAnswer } from "./model/comment.model";
import { CommentDto } from "./dto/comment.Dto";
import { TypeEnumComment, TypeEnumSned } from "./enum/typeComment.enum";

export class CommentController {
    constructor(
        private commentRepository = CommentModel<IComment>,
        private answerRepository = AnswerModel<IAnswer>
    ) { }

    async addComment() { }
    async addAnswer() { }
    async readComment() { }
    async removeComment() { }
    async avrageStar() { }
    async changeStatus() { }
    async findComment(id: ObjectId) { }
    async aggregateCommentForAsnswer(id: ObjectId) { }
    commentExistence(commentDto: CommentDto, method: TypeEnumComment, sendType: TypeEnumSned) { }
}   