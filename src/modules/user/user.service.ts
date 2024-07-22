import { IUser, UserModel } from "./model/user.model";
import { UserDto } from "./dto/user.dto";
import { validateObjectID } from "src/common/functions/globalFunction";
import { BadRequest, NotFound } from "http-errors"
import { AnswerModel, CommentModel, IAnswer, IComment } from "../comment/model/comment.model";

class UserService {
    constructor(
        private readonly userRepository = UserModel<IUser>,
        private readonly commentRepository = CommentModel<IComment>,
        private readonly answerRepository = AnswerModel<IAnswer>
    ) { }

    async getAllCommentUser(userID: string) {
        if (!validateObjectID(userID))
            throw BadRequest("آیدی ارسال شده صحیح نمیباشد")
        const findUser = await this.userRepository.findOne({ _id: userID })
        if (!findUser) throw NotFound("کاربری یافت نشد")
        const comment = await this.commentRepository.find({ userID: findUser._id }, { "title": 1, "text": 1, "status": 1 }).populate("user", "+first_name", "+last_name");
        const answer = await this.answerRepository.find({ userID: findUser._id }, { "title": 1, "text": 1, "status": 1 }).populate("user", "+first_name", "+last_name");
        if (!comment && !answer) throw NotFound("شما هیچ کامنتی ندارید")
        return {
            comment,
            answer
        }
    }
}
const UserServices = new UserService()
export {
    UserServices as UserService
}