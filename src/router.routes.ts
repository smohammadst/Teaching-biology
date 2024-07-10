import { Router } from "express";
import userRouter from "./modules/user/user.router";
import categoryRouter from "./modules/category/category.router";
import courseRouter from "./modules/course/course.router";

const router = Router();

export default (): Router => {
    //userRouter(router)
    courseRouter(router)
    categoryRouter(router)
    return router;
};