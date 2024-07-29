import { Router } from "express";
import { AuthController } from "./auth.controller";
import { verifyToken } from "./../../common/functions/globalFunction";

const authController = new AuthController()

export default (router: Router) => {
    router.post("/auth/register", authController.register)
    router.post("/auth/login", authController.loginOtp)
    router.post("/auth/checkOtp", authController.checkOtp)
    router.post("/auth/resetCode", authController.resetCode)
    router.post("/auth/refreshToken", authController.refreshToken)
};