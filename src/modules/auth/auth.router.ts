import { Router } from "express";
import { AuthController } from "./auth.controller";

const authController = new AuthController()

export default (router: Router) => {
    router.post("userExistence", authController.userExistence)
    router.post("changePassword", authController.changePassword)
};