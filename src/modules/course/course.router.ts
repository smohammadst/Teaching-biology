import { Router } from "express";
import { CourseController } from "./course.controller";
import { ChapterController } from "./chapter.controller";


const courseController = new CourseController()
const chapterController = new ChapterController()

export default (router: Router) => {

    router.post("/create", courseController.create)
    router.post("/addchapter", chapterController.create)
    

}