import { createAccount } from "../controller/user";
import { Router } from "express"

const userRouter = Router({mergeParams:true})

userRouter.route("/create").post(createAccount)


export default userRouter