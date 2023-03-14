import {Router} from "express";
import validatorMiddleware from "../middleware/validator.middleware.js";
import { newsEmailSchema } from "../validator_schema/inputShema.js";
import { subscribeNewsletter, unsubscribeNewsletter } from "../controller/newsletter.controller.js";

const newsRouter = Router();
//subscribe newsletter
newsRouter.route("/newsletter").post(validatorMiddleware(newsEmailSchema, "body"), subscribeNewsletter );
//unsubcribe newsletter
newsRouter.route("/newsletter/:id").delete(unsubscribeNewsletter);


export default newsRouter;