import { Router } from "express";
import { UserController } from "./user.controller";

const userController = new UserController()

export default (router: Router) => {
    router.post("/create", userController.create)
}