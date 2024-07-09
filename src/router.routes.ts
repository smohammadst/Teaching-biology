import { Router } from "express";
import userRouter from "./modules/user/user.router";
import categoryRouter from "./modules/category/category.router";

const router = Router();

export default (): Router => {
    userRouter(router)
    categoryRouter(router)
    return router;
};