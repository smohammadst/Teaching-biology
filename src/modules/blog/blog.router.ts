import { Router } from "express";
import { BlogController } from "./blog.controller";
import { verifyToken } from "./../../common/functions/globalFunction";

const blogController = new BlogController()

export default (router: Router) => {
    router.post("/createBlog", blogController.create)
    router.put("/updateBlog/:id", blogController.update)
    router.delete("/deleteBlog/:id", blogController.delete)
    router.get("/getOneBlog/:id", blogController.findOneBlog)
    router.get("/getAllBlog/:categoryId/:limit/:filter", blogController.findAllBlog)
    router.get("/blog/addLike/:id", verifyToken, blogController.like)
}
