import { IUser, UserModel } from "./model/user.model";
import { UserDto } from "./dto/user.dto";
import { validateObjectID } from "./../../common/functions/globalFunction";
import { BadRequest, NotFound } from "http-errors"
import { AnswerModel, CommentModel, IAnswer, IComment } from "../comment/model/comment.model";
import { EvidenceModel, IEvidence } from "../evidence/model/evidence.mode";
import { CourseModel, ICourse } from "../course/model/course.model";
import { BlogModel, IBlog } from "../blog/model/blog.model";
import { ISale, PaymentModel, SaleModel } from "../zarinpal/model/zarinpal.model";

class UserService {
    constructor(
        private readonly userRepository = UserModel<IUser>,
        private readonly commentRepository = CommentModel<IComment>,
        private readonly answerRepository = AnswerModel<IAnswer>,
        private readonly evidenceRepository = EvidenceModel<IEvidence>,
        private readonly courseRepository = CourseModel<ICourse>,
        private readonly blogRepository = BlogModel<IBlog>,
        private readonly saleRepository = SaleModel<ISale>
    ) { }

    async getAllCommentUser(userID: string) {
        validateObjectID(userID)
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
    async findEvidenceForUser(userID: string) {
        // validateObjectID(userID);
        console.log(userID);
        const findEvidenceUser = await this.evidenceRepository.find({ userID }).populate("user", "+first_name", "+last_name").populate("course", "+title")
        if (!findEvidenceUser) throw NotFound("شما گواهی درخواست نداده ایید")
        return { evidence: findEvidenceUser }
    }

    async bought(userID: string) {
        // validateObjectID(userID);
        console.log(userID);
        const findUser = await this.userRepository.findOne({ _id: userID })
            .populate({ path: "bought", model: CourseModel, select: { "title": 1, "images": 1, "shortText": 1, "price": 1 } })
        return { findUser }
    }

    async getLikeCourse(userID: string) {
        // validateObjectID(userID)
        console.log(userID);
        const findAllCourseLike = await this.courseRepository.find({ $in: { like: userID } });
        if (!findAllCourseLike) throw NotFound("لیست علاقه مندی های شما خالی میباشد")
        return { findAllCourseLike }
    }
    async getLikeBlog(userID: string) {
        // validateObjectID(userID)
        console.log(userID);
        const findAllBlogLike = await this.blogRepository.find({ $in: { like: userID } });
        if (!findAllBlogLike) throw NotFound("لیست علاقه مندی های شما خالی میباشد")
        return { findAllBlogLike }
    }

    async getAllUser() {
        const result = await this.userRepository.find({})
        return result
    }
}
const UserServices = new UserService()
export {
    UserServices as UserService
}