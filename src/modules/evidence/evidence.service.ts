import { NotFound, ServiceUnavailable, BadRequest } from 'http-errors';
import { CourseModel, ICourse } from "../course/model/course.model";
import { RequestDto } from "./dto/evidence.dto";
import { validateObjectID } from './../../common/functions/globalFunction';
import { IUser, UserModel } from '../user/model/user.model';
import { EvidenceModel, IEvidence } from './model/evidence.mode';
import { statusEnum } from './../../common/enums/status.enum';

class EvidenceService {
    constructor(
        private readonly courseRepository = CourseModel<ICourse>,
        private readonly userRepository = UserModel<IUser>,
        private readonly evidenceRepository = EvidenceModel<IEvidence>
    ) { }

    async addRequestForAdmin(requestAdd: RequestDto, userID: string) {
        const { courseID } = requestAdd;
        validateObjectID(userID)
        const findUser = await this.userRepository.findOne({ _id: userID })
        if (!findUser)
            throw NotFound("کاربری یافت نشد")
        const findCourse = await this.courseRepository.findOne({ _id: courseID })
        if (!findCourse)
            throw NotFound("دوره ایی یافت نشد")
        const findEvidence = await this.evidenceRepository.findOne({ courseID, userID })
        if (findEvidence) throw BadRequest("شما قبلا در خواست ارسال کرده ایید منتظر بمانید تا درخواست شما بررسی بشود")
        const addRequest = await this.evidenceRepository.create({ courseID, userID })
        if (!addRequest) throw ServiceUnavailable("سرور با مشکل مواجه شده است دوباره تلاش کنید")
        return { status: 201, message: "در خواست شما با موفقیا ثبت گردید " }
    }

    async readAllEvidence() {
        const findEvidences = await this.evidenceRepository.find({ status: statusEnum.pending })
            .populate("course", "+title").populate("user", "first_name", "last_name")
        if (!findEvidences) throw NotFound("گواهی یافت نشد")
        return { evidence: findEvidences }
    }

    async changeStatusEvidence(id: string, status: boolean) {
        validateObjectID(id)
        const findEvidence = await this.evidenceRepository.findOne({ _id: id });
        if (!findEvidence) throw NotFound("گواهی یافت نشد")
        if (status) {
            findEvidence.status = statusEnum.accept
            findEvidence.save()
        } else {
            findEvidence.status = statusEnum.reject
            findEvidence.save()
        }
        return { evidence: findEvidence }
    }

    async uploadFileEvidence(userID: string, courseID: string, routUpload: string) {
        validateObjectID(userID)
        validateObjectID(courseID)
    }
}

const evidenceService = new EvidenceService()

export {
    evidenceService as EvidenceService
}