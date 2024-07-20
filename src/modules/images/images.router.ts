import { Router } from "express";
import { ImageController } from "./images.controller";


const imageController = new ImageController()

export default (router: Router) => {
    
    router.post("/addImage", imageController.create)
}