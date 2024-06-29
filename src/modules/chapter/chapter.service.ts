import { title } from "process";
import { ChapterDto } from "./dto/chapter.dto";
import { ChapterModel, IChapter } from "./model/chapter.model";
const createError = require("http-errors");

class chapterService {
    constructor(
        private chapterModel = ChapterModel<IChapter>
    ) { }
    
    // Add a chapter to the desired course
    async create(chapter: ChapterDto): Promise<object>{
        const result = await this.chapterModel.create({
            title: chapter.title,
            text: chapter.text,
            time: chapter.time
        })
        return {status: 201, message: 'با موفقیت اضافه شد'}
    }

    // Updating a chapter of the desired course
    async update(id: string, chapter: ChapterDto): Promise<object>{
        const result = await this.chapterModel.updateOne({_id: id}, {
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
        const result = await this.chapterModel.deleteOne({_id: id})
        return {status: 200, message: "با موفقیت حذف شد"}
    }

    // Find a chapter of the desired course

    async findChapter(id: string): Promise<IChapter> {
        const chapter = await this.chapterModel.findOne({ _id: id });
        if (!chapter) throw createError.NotFound("فصلی با این شناسه پیدا نشد");
        return chapter
    }
}


const chapterServices = new chapterService()

export {
    chapterServices
}