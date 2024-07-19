import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyToken } from "./../../common/functions/globalFunction";

const authController = new AuthController()

export default (router: Router) => {
    router.post("/userExistence", authController.userExistence)
    router.post("changePassword",verifyToken, authController.changePassword)
};