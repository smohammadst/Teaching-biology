import { Router } from "express";
import userRouter from "./modules/user/user.router";

const router = Router();

export default (): Router => {
    userRouter(router)
    return router;
};