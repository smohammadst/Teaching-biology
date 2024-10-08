import { Router } from "express";
import userRouter from "./modules/user/user.router";
import categoryRouter from "./modules/category/category.router";
import courseRouter from "./modules/course/course.router";
import authRouter from "./modules/auth/auth.router"
import imagesRouter from "./modules/images/images.router";
import blogRouter from "./modules/blog/blog.router";
import zarinpalRouter from "./modules/zarinpal/zarinpal.router"
import searchRouter from "./modules/search/search.router";
import ticketRouter from "./modules/tiket/tiket.router";
import evidenceRouter from "./modules/evidence/evidence.router";
import commentRouter from "./modules/comment/comment.router";
import sliderRouter from "./modules/slider/slider.router";
import faqRouter from "./modules/FAQ/faq.router";
const router = Router();

export default (): Router => {
    userRouter(router)
    courseRouter(router)
    categoryRouter(router)
    authRouter(router)
    imagesRouter(router)
    blogRouter(router)
    zarinpalRouter(router)
    searchRouter(router)
    ticketRouter(router)
    evidenceRouter(router)
    commentRouter(router)
    sliderRouter(router)
    faqRouter(router)
    return router;
};
