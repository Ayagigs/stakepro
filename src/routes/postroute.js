import express from "express";
import { writeBlog } from "../controller/postcontroller.js";
import validatorMiddleware from "../middleware/validator.middleware.js";
import {writeBlogSchema} from "../validator_schema/inputShema.js";
import checkToken from "../auth/authentication.js";

const postRouter = express.Router();

// create Blog
postRouter.route("/create-blog").post(checkToken, validatorMiddleware(writeBlogSchema, "body"), writeBlog);

export default postRouter;
