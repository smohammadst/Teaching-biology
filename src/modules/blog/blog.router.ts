import { Router } from "express";
import { BlogController } from "./blog.controller";

const blogController = new BlogController()

export default (router: Router) => {
    router.post("/create", blogController.create)
    router.patch("/update", blogController.update)
    router.delete("/delete", blogController.delete)
}
