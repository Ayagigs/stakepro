import { Router } from "express";
import { createPosts, deletePost, getAllPosts, updatePost, getPost } from "../controller/blog.controller"
import { blogSchema, blogIdSchema } from "../validator_schema/blogSchema";
import validatorMiddleware from "../middleware/validator.middleware";

const blogRouter = Router({ mergeParams: true })

blogRouter.route("/")
    .get(getAllPosts)
    .post(
        validatorMiddleware(blogSchema, "body"),
        createPosts
    )

blogRouter.route("/:id")
    .put(
        validatorMiddleware(blogIdSchema, "params"),
        updatePost
    ).delete(
        validatorMiddleware(blogIdSchema, "params"),
        deletePost
    ).get(
        validatorMiddleware(blogIdSchema, "params"),
        getPost
    )

export default blogRouter