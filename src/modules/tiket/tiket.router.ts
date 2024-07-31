import { Router } from "express";
import { TiketController } from "./tiket.controller";

export default (router: Router) => {
    router.post("/tiket/add", TiketController.create)
    router.get("/tiket/readAll", TiketController.read)
    router.delete("/tiket/remove/:id", TiketController.delete)
}