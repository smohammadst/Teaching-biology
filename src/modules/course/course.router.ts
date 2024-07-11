import { Router } from "express";
import { CourseController } from "./course.controller";
import { ChapterController } from "./chapter.controller";
import { EpisodeController } from "./episode.controller";


const courseController = new CourseController()
const chapterController = new ChapterController()
const episodeController = new EpisodeController()

export default (router: Router) => {

    router.post("/createCourse", courseController.create)
    //chapter
    router.post("/addchapter", chapterController.create)
    router.patch("/chapter/delete/:id", chapterController.delete)
    router.patch("/chapter/update/:id", chapterController.update)
    //episode
    router.post("/createEpisode", episodeController.create)
    router.patch("/deleteEpisode/:episodeID", episodeController.delete)
    

}