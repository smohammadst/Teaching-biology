import { Router } from "express";
import { CommentController } from "./comment.controller";
import { verifyToken } from "./../../common/functions/globalFunction";


export default (router: Router) => {
    router.post("/comment/addComment", verifyToken, CommentController.createCommentAndAnswer)

    router.post("/comment/changeStatus", CommentController.changeStatus)

    router.delete("/comment/deleteComment", CommentController.deleteComment)

    router.get("/comment/allComment", CommentController.readAllComments)
}