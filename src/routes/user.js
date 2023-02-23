import { createAccount } from "../controller/user";
import { Router } from "express"
import validatorMiddleware from "../middleware/validator.middleware";
import createAccountSchema from "../validator/client/createAccountShema";

const userRouter = Router({ mergeParams: true })

userRouter.route("/create").post(validatorMiddleware(createAccountSchema, "body"), createAccount)


export default userRouter