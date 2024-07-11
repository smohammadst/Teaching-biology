import { Router } from "express";
import { CourseController } from "./course.controller";
import { ChapterController } from "./chapter.controller";


const courseController = new CourseController()
const chapterController = new ChapterController()

export default (router: Router) => {

    router.post("/createCourse", courseController.create)
    router.post("/addchapter", chapterController.create)
    router.patch("/chapter/delete/:id", chapterController.delete)
    router.patch("/chapter/update/:id", chapterController.update)
    

}