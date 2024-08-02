import mongoose from "mongoose";
import { IComment, CommentModel, AnswerModel, IAnswer } from "./model/comment.model";
import { CommentDto } from "./dto/comment.Dto";
import { TypeEnumComment, TypeEnumSned } from "./enum/typeComment.enum";
import * as createHttpError from "http-errors";
import { GlobalMessageError, NotFoundError } from "./../../common/enums/message.enum";
import { BlogModel, IBlog } from "../blog/model/blog.model";
import { CourseModel, ICourse } from "../course/model/course.model";
import { statusEnum as statusComment } from './../../common/enums/status.enum'

export class CommentService {
    constructor(
        private commentRepository = CommentModel<IComment>,
        private answerRepository = AnswerModel<IAnswer>,
        private blogRepository = BlogModel<IBlog>,
        private courseRepository = CourseModel<ICourse>
    ) { }

    async createSchemaComment(commentDto: CommentDto, userID: string): Promise<IComment> {
        let createComment: IComment = await this.commentRepository.create({
            text: commentDto.text,
            userID: userID,
            [commentDto.method]: commentDto.ID
        })
        if (!createComment) throw createHttpError.ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        return createComment
    }

    async createSchemaAnswer(commentDto: CommentDto, userID: string): Promise<IAnswer> {
        const findComment = await this.findComment(commentDto.parent);
        let createAnswer: IAnswer = await this.answerRepository.create({
            text: commentDto.text,
            userID: userID,
            [commentDto.method]: commentDto.ID,
            commentID: commentDto.parent
        })
        if (!createAnswer) throw createHttpError.ServiceUnavailable(GlobalMessageError.ServiceUnavailable)
        await findComment.updateOne({ $push: { answer: createAnswer } })
        await findComment.save()
        return createAnswer
    }

    async addComment(commentDto: CommentDto, userID: string): Promise<object> {
        const { method } = commentDto
        const existRepository = await this.findBlogOrCourse(commentDto.ID, method)
        const createComment = await this.createSchemaComment(commentDto, userID)
        await existRepository.find.updateOne({ $push: { commentsID: createComment._id } })
        return { message: "نظر شما با موفقیت ثبت گردید" }
    }

    async addAnswer(commentDto: CommentDto, userID: string): Promise<object> {
        const { method } = commentDto
        const existRepository = await this.findBlogOrCourse(commentDto.ID, method)
        const createAnswer = await this.createSchemaAnswer(commentDto, userID)
        return { message: "نظر شما با موفقیت ثبت گردید" }
    }

    async removeComment(id: string): Promise<object> {
        const findComment = await this.commentRepository.deleteOne({ _id: id });
        if (findComment.deletedCount == 0) {
            const findAnswer = await this.answerRepository.deleteOne({ _id: id });
            if (findAnswer.deletedCount == 0)
                throw createHttpError.NotFound(NotFoundError.NotFoundComment)
        }
        return { message: 'کامنت با موفقیت حذف گردید' }
    }
    async avrageStar(): Promise<number> {
        const comments = await this.commentRepository.find({ status: statusComment.accept })
        const countComment = comments.length
        let sumStar = 0
        for (let i = 0; i < comments.length; i++) {
            sumStar += comments[i].star;
        }
        const avrage = sumStar / countComment
        return avrage
    }
    async changeStatus(id: string, status: boolean): Promise<object> {
        const findComment = await this.commentRepository.findOne({ _id: id });
        if (!findComment) {
            const findAnswer = await this.answerRepository.findOne({ _id: id });
            if (!findAnswer) throw createHttpError.NotFound(NotFoundError.NotFoundComment)
            if (status)
                findAnswer.status = statusComment.accept
            else
                findAnswer.status = statusComment.reject
            await findAnswer.save()
            return { message: "با موفقیت انجام شد" }
        }
        findComment.status = statusComment.accept
        await findComment.save()
        return { message: "با موفقیت انجام شد" }
    }
    async findComment(id: string): Promise<IComment> {
        const comment = await this.commentRepository.findOne({ _id: id });
        if (!comment) throw createHttpError.NotFound(NotFoundError.NotFoundComment)
        return comment
    }

    async readCommentForAsnswer(id: string, method: TypeEnumComment): Promise<{ find: IBlog | ICourse }> {
        let result: { find: IBlog | ICourse }
        switch (method) {
            case TypeEnumComment.blog:
                result = await this.populateCommentAndAnswer(this.blogRepository, id)
                break
            case TypeEnumComment.course:
                result = await this.populateCommentAndAnswer(this.courseRepository, id)
                break
        }
        return result
    }

    async populateCommentAndAnswer(repository: mongoose.DocumentSetOptions, id: string): Promise<{ find: IBlog | ICourse }> {
        let find = await repository.findOne({ _id: id, status: true }).populate(
            {
                path: "comments",
                select: ["title", "text", "fullName", "star"]
            }
        ).populate({
            path: "comments.answer",
            select: ["title", "text", "fullName"]
        })
        if (!find) throw createHttpError.NotFound(NotFoundError.NotFoundBlog)
        return { find }
    }

    async TyepRequest(commentDto: CommentDto, userID:string): Promise<object> {
        const { snedType } = commentDto;
        switch (snedType) {
            case TypeEnumSned.comment:
                return await this.addComment(commentDto, userID)
            case TypeEnumSned.answer:
                return await this.addAnswer(commentDto, userID)
        }
    }

    async findBlogOrCourse(id: string, methode: TypeEnumComment): Promise<{
        type: string, find: IBlog | ICourse
    }> {
        let find: ICourse | IBlog
        switch (methode) {
            case TypeEnumComment.blog:
                find = await this.blogRepository.findOne({ _id: id })
                if (!find) throw createHttpError.NotFound(NotFoundError.NotFoundBlog)
                return { type: "blog", find }
            case TypeEnumComment.course:
                find = await this.courseRepository.findOne({ _id: id })
                if (!find) throw createHttpError.NotFound(NotFoundError.NotFoundCourse)
                return { type: "course", find }
        }
    }

    async readAllCommentsAndAnswerByAdmin() {
        const allComment = await this.commentRepository.find({ status: statusComment.reject })
            .populate({
                path: "answer",
                model: "answer",
                match: { status: statusComment.reject }
            }).exec()
        if (allComment) return { status: 404, message: "هیچ کامنتی یافت نشد" }
        return { allComment }
    }
}