
import { CourseModel, ICourse } from "../course/model/course.model";
import { EpisodeDto } from "./dto/episode.dto";
import createHttpError from "http-errors";



class episodeService {
    constructor(
        private courseModel = CourseModel<ICourse>,
    ) { }
    // Add a chapter to the desired course
    async createEpisode(courseID: string,chapterID: string, episode: EpisodeDto): Promise<object>{

        const course = await this.courseModel.findOne({_id: courseID});
        //if(!course) throw createHttpError.NotFound('دوره یافت نشد')

        const result = await this.courseModel.updateOne(
            {
              _id:courseID,
              "chapters._id": chapterID,
            },
            {
              $push: {
                "chapters.$.episodes": {title: episode.title, time: episode.time},
              },
            }
          );
        return {status: 201, message: 'با موفقیت اضافه شد'}
    }

    // Updating a chapter of the desired course
    // async updateEpisode(courseID: string, chapterID, episode: EpisodeDto): Promise<object>{
    //     const result = await this.courseModel.updateOne()
    //     return {status: 200, message: "با موفقیت اپدیت شد"}
    // }
    
    // Delete a chapter from the desired course 
    async deleteEpisode(episodeID: string): Promise<object>{
        const result = await this.courseModel.updateOne(
            {
              "chapters.episodes._id": episodeID,
            },
            {
              $pull: {
                "chapters.$.episodes": {
                  _id: episodeID,
                },
              },
            }
          );
        if(!result) throw createHttpError.InternalServerError("حذف نشد")
        return {status: 200, message: "با موفقیت حذف شد"}
    }

}


const episodeServices = new episodeService()

export {
    episodeServices
}