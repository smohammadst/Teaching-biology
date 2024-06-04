import mongoose from "mongoose";
import { IComment, CommentModel, AnswerModel, IAnswer } from "./model/comment.model";
import { CommentDto } from "./dto/comment.Dto";
import { TypeEnumComment, TypeEnumSned } from "./enum/typeComment.enum";
import createHttpError from "http-errors";
import { GlobalMessageError, NotFoundError } from "src/common/enums/message.enum";
import { BlogModel, IBlog } from "../blog/model/blog.model";
import { CourseModel, ICourse } from "../course/model/course.model";

export class CommentController {
    constructor(
        private commentRepository = CommentModel<IComment>,
        private answerRepository = AnswerModel<IAnswer>,
        private blogRepository = BlogModel<IBlog>,
        private courseRepository = CourseModel<ICourse>
    ) { }

    async createSchemaComment(commentDto: CommentDto): Promise<IComment> {
        let createComment: IComment
        if (commentDto.userID) {
            createComment = await this.commentRepository.create({
                title: commentDto.title,
                text: commentDto.text,
                userID: commentDto.userID,
                [commentDto.method]: commentDto.ID
            })
        } else {
            createComment = await this.commentRepository.create({
                title: commentDto.title,
                text: commentDto.text,
                [commentDto.method]: commentDto.ID,
                fullName: commentDto.fullName,
                email: commentDto.email
            })
        }
        if (!createComment) throw createHttpError.InternalServerError(GlobalMessageError.InternalServerError)
        return createComment
    }

    async createSchemaAnswer(commentDto: CommentDto): Promise<IAnswer> {
        let createAnswer: IAnswer
        const findComment = await this.findComment(commentDto.parent)
        if (commentDto.userID) {
            createAnswer = await this.answerRepository.create({
                title: commentDto.title,
                text: commentDto.text,
                userID: commentDto.userID,
                [commentDto.method]: commentDto.ID,
                commentID: commentDto.parent
            })
        } else {
            createAnswer = await this.answerRepository.create({
                title: commentDto.title,
                text: commentDto.text,
                [commentDto.method]: commentDto.ID,
                fullName: commentDto.fullName,
                email: commentDto.email,
                commentID: commentDto.parent
            })
        }
        if (!createAnswer) throw createHttpError.InternalServerError(GlobalMessageError.InternalServerError)
        await findComment.updateOne({ $push: { answer: createAnswer } })
        await findComment.save()
        return createAnswer
    }

    async addComment(commentDto: CommentDto): Promise<object> {
        const { method } = commentDto
        const existRepository = await this.findBlogOrCourse(commentDto.ID, method)
        const createComment = await this.createSchemaComment(commentDto)
        await existRepository.find.updateOne({ $push: { commentsID: createComment._id } })
        return { status: 201, message: "نظر شما با موفقیت ثبت گردید" }
    }

    async addAnswer(commentDto: CommentDto): Promise<object> {
        const { method } = commentDto
        const existRepository = await this.findBlogOrCourse(commentDto.ID, method)
        const createAnswer = await this.createSchemaAnswer(commentDto)
        return { status: 201, message: "نظر شما با موفقیت ثبت گردید" }
    }

    async removeComment(id: string): Promise<object> {
        const findComment = await this.commentRepository.deleteOne({ _id: id });
        if (findComment.deletedCount == 0) {
            const findAnswer = await this.answerRepository.deleteOne({ _id: id });
            if (findAnswer.deletedCount == 0)
                throw createHttpError.NotFound(NotFoundError.NotFoundComment)
        }
        return { status: 200, message: 'کامنت با موفقیت حذف گردید' }
    }
    async avrageStar(id: string): Promise<number> {
        const comments = await this.commentRepository.find({ status: true })
        const countComment = comments.length
        let sumStar = 0
        for (let i = 0; i < comments.length; i++) {
            sumStar += comments[i].star;
        }
        const avrage = sumStar / countComment
        return avrage
    }
    async changeStatus(id: string): Promise<object> {
        const findComment = await this.commentRepository.findOne({ _id: id });
        if (!findComment) {
            const findAnswer = await this.answerRepository.findOne({ _id: id });
            if (!findAnswer) throw createHttpError.NotFound(NotFoundError.NotFoundComment)
            findAnswer.status = true
            await findAnswer.save()
            return { status: 200, message: "با موفقیت انجام شد" }
        }
        findComment.status = true
        await findComment.save()
        return { status: 200, message: "با موفقیت انجام شد" }
    }
    async findComment(id: string): Promise<IComment> {
        const comment = await this.commentRepository.findOne({ _id: id });
        if (!comment) throw createHttpError.NotFound(NotFoundError.NotFoundComment)
        return comment
    }

    async readCommentForAsnswer(id: string, method: TypeEnumComment): Promise<{ status: number, find: IBlog | ICourse }> {
        let result: { status: number, find: IBlog | ICourse }
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

    async populateCommentAndAnswer(repository: mongoose.DocumentSetOptions, id: string): Promise<{ status: number, find: IBlog | ICourse }> {
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
        return { status: 200, find }
    }

    TyepRequest(commentDto: CommentDto): Promise<object> {
        const { snedType } = commentDto;
        switch (snedType) {
            case TypeEnumSned.comment:
                return this.addComment(commentDto)
            case TypeEnumSned.answer:
                return this.addAnswer(commentDto)
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
}   