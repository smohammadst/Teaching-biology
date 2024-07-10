import { title } from "process";
import { ChapterDto } from "./dto/chapter.dto";
import { CourseModel, ICourse } from "../course/model/course.model";
import createHttpError from "http-errors";


class chapterService {
    constructor(
        private courseModel = CourseModel<ICourse>,
    ) { }
    
    // Add a chapter to the desired course
    async createChapter(id: string, chapter: ChapterDto): Promise<object>{

        const course = await this.courseModel.findOne({_id: id});
        if(!course) throw createHttpError.NotFound('دوره یافت نشد')

        const result = await this.courseModel.create(
            { _id: id }, 
            {
                $push: {

                    chapters: {
                        text: chapter.text,
                        title: chapter.title, 
                        time: chapter.time,
                    }

            }})
        return {status: 201, message: 'با موفقیت اضافه شد'}
    }

    // Updating a chapter of the desired course
    async update(id: string, chapter: ChapterDto): Promise<object>{
        const result = await this.courseModel.updateOne({_id: id}, {
            $set: {
                title: chapter.title,
                text: chapter.text,
                time: chapter.time
            }
    })
        return {status: 200, message: "با موفقیت اپدیت شد"}
    }
    
    // Delete a chapter from the desired course 
    async delete(id: string): Promise<object>{
        const result = await this.courseModel.updateOne(
            {"chapters._id": id},
            {$pull : {  chapters : { _id: id } } },
        )
        return {status: 200, message: "با موفقیت حذف شد"}
    }

    // Find a chapter of the desired course

    
}


const chapterServices = new chapterService()

export {
    chapterServices
}