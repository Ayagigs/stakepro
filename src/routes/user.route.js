import { createAccount } from "../controller/user.controller";
import { Router } from "express"
import validatorMiddleware from "../middleware/validator.middleware";
import createAccountSchema from "../validator_schema/createAccountShema";

const userRouter = Router({ mergeParams: true })

userRouter.route("/create").post(validatorMiddleware(createAccountSchema, "body"), createAccount)


export default userRouter