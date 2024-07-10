import { Router } from "express";

import { CategoryController } from "./category.controller";

const categoryController = new CategoryController()

export default (router: Router) => {
    router.post("/addCategoryCourse", categoryController.createCategoryCourse)
    router.post("/addCategoryBlog", categoryController.createCategoryBlog)
    router.post("/getchildern", categoryController.getAllChildern)
}