import { Router } from "express";
import { CourseController } from "./course.controller";


const courseController = new CourseController()

export default (router: Router) => {

    router.post("/create", courseController.create)

}