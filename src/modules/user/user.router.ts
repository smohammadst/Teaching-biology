import { Router } from "express";
import { UserController } from "./user.controller";
import { verifyToken } from "./../../common/functions/globalFunction";

const userController = new UserController()

export default (router: Router) => {
    router.get("/user/getAllComment", verifyToken, userController.getAllComment)
    router.get("/user/getAllCertificate", verifyToken, userController.findEvidenceUser)
    router.get("/user/getAllLikeCourse", verifyToken, userController.getLikeCourse)
    router.get("/user/getAllLikeBlog", verifyToken, userController.getLikeBlog)
    router.get("/user/getBought", verifyToken, userController.getBought)
}