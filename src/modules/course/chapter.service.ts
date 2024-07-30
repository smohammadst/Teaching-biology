import { title } from "process";
import { ChapterDto } from "./dto/chapter.dto";
import { CourseModel, ICourse } from "../course/model/course.model";
import createHttpError from "http-errors";
import mongoose, { isValidObjectId, ObjectId } from "mongoose";
import { AuthMessageError, GlobalMessageError } from './../../common/enums/message.enum';
import { Conflict, BadRequest, NotFound, Unauthorized, ServiceUnavailable } from 'http-errors';


class chapterService {
    constructor(
        private courseModel = CourseModel<ICourse>,
    ) { }

    // Add a chapter to the desired course
    async createChapter(data: ChapterDto): Promise<object> {
        const { id } = data
        const course = await this.courseModel.findById(id);
        if (!course) throw createHttpError.NotFound('دوره یافت نشد')
        const result = await this.courseModel.findOneAndUpdate(
            { _id: course._id },
            {
                $push: {
                    chapters: {
                        title: data.title,
                        time: data.time,
                    }

                }
            })
        return { message: 'با موفقیت اضافه شد' }
    }

    // Updating a chapter of the desired course
    async update(id: string, chapter: ChapterDto): Promise<object> {
        const result = await this.courseModel.updateOne({ "chapters._id": id },
            {
                $set:
                {
                    "chapters.$": {
                        title: chapter.title,
                        time: chapter.time
                    }
                }
            })
        return { message: "با موفقیت اپدیت شد" }
    }

    // Delete a chapter from the desired course 
    async delete(id: string): Promise<object> {
        const result = await this.courseModel.updateOne(
            { "chapters._id": id },
            { $pull: { chapters: { _id: id } } },
        )
        return { message: "با موفقیت حذف شد" }
    }

    // Find a chapter of the desired course

    async getChapters(id: string): Promise<ICourse> {
        const chapter = await this.courseModel.findOne({ _id: id }, { chapters: 1, title: 1 })
        if (!chapter) throw NotFound(AuthMessageError.NotFound)
        return chapter

    }
}


const chapterServices = new chapterService()

export {
    chapterServices
}