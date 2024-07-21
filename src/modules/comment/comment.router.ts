import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router()

const commentController = new CommentController()

export default (router: Router) => {
    router.post("/comment/addComment", commentController.createCommentAndAnswer)

    router.post("/comment/changeStatus", commentController.changeStatus)

    router.delete("/comment/deleteComment", commentController.deleteComment)

    router.get("/comment/allComment", commentController.readAllComments)
}