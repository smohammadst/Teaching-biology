import { Router } from "express";
import { CommentController } from "./comment.controller";

const router = Router()

const commentController = new CommentController()

export default (router: Router) => {
    router.post("addComment", commentController.createCommentAndAnswer)

    router.post("changeStatus", commentController.changeStatus)

    router.delete("deleteComment", commentController.deleteComment)

    router.get("allComment", commentController.readAllComments)
}