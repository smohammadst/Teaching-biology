import { Router } from "express";

import { CategoryController } from "./category.controller";

const categoryController = new CategoryController()

export default (router: Router) => {
    router.post("/add", categoryController.create)
    router.post("/all", categoryController.getAllChildern)
}