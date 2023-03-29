import express from "express";
import { writeBlog, deleteBlog, updateBlog, getAllBlogs } from "../controller/post.controller.js";
import validatorMiddleware from "../middleware/validator.middleware.js";
import {writeBlogSchema, updateBlogSchema} from "../validator_schema/inputShema.js";
import checkToken from "../auth/authentication.js";

const postRouter = express.Router();

// create Blog
postRouter.route("/create-blog").post(checkToken, validatorMiddleware(writeBlogSchema, "body"), writeBlog);

// update Blog
postRouter.route("/updateblog/:id").post(checkToken, validatorMiddleware(updateBlogSchema, "body"), updateBlog);

// delete Blog
postRouter.route("/deleteblog/:id").delete(checkToken, deleteBlog);

// get all blogs
postRouter.route("/allblogs").get(checkToken, getAllBlogs);
export default postRouter;
