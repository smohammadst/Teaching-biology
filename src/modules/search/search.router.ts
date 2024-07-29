import { Router } from "express"
import { SearchController } from "./search.controller"

export default (router: Router) => {
    router.get("/searchBlog", SearchController.blog)
    router.get("/searchCourse" , SearchController.course)
    router.get("/searchAll" , SearchController.all)
}