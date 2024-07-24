import { Router } from "express";
import { UserController } from "./user.controller";

const userController = new UserController()

export default (router: Router) => {
    router.get("/user/getAllComment", userController.getAllComment),
    router.get("/user/getAllCertificate" , userController.findEvidenceUser),
    router.get("/user/getAllLikeCourse" , userController.getLikeCourse),
    router.get("/user/getAllLikeBlog" , userController.getLikeBlog)
}