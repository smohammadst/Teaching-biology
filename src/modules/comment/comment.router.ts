import { Router } from "express";
import { CommentController } from "./comment.controller";
import { verifyToken } from "./../../common/functions/globalFunction";


export default (router: Router) => {
    router.post("/comment/addComment", verifyToken, CommentController.createCommentAndAnswer)

    router.get("/comment/changeStatus/:id", CommentController.changeStatus)

    router.delete("/comment/deleteComment/:id", CommentController.deleteComment)

    router.get("/comment/readByAdmin", CommentController.readAllComments)
}