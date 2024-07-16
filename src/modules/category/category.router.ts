import { Router } from "express";

import { CategoryController } from "./category.controller";

const categoryController = new CategoryController()

export default (router: Router) => {
    router.post("/addCategory", categoryController.createCategoryCourse)
    router.post("/getchildern", categoryController.getAllChildern)
    router.get("/all", categoryController.getAllCategory)
}
