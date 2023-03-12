import {Router} from "express";
import validatorMiddleware from "../middleware/validator.middleware.js";
import { supportSchema } from "../validator_schema/inputShema.js";
import { userQuery, clearTicket } from "../controller/supportcontroller.js";

const supportRouter = Router();
//subscribe newsletter
supportRouter.route("/ticket").post(validatorMiddleware(supportSchema, "body"), userQuery );
//unsubcribe newsletter
supportRouter.route("/:id").patch(clearTicket);


export default supportRouter;