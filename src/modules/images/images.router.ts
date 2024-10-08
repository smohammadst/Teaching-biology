import { Response, Router, Request } from "express";
import { ImageController } from "./images.controller";
import { upload } from "../fileupload";


const imageController = new ImageController()

export default (router: Router) => {
    router.post("/addImage", upload.array("images", 10), imageController.create)
    router.get('/admin/image/list' , imageController.getAll)
    router.get("/admin/image/remove/:id" , imageController.remove)
}
