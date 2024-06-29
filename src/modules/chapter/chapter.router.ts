import { Router } from "express";
import { ChapterController } from "./chapter.controller";


const chapterController = new ChapterController()

export default (router: Router) => {
    router.post("/create", chapterController.create)
    router.patch("/update", chapterController.update)
    router.delete("/delete", chapterController.delete)
}
