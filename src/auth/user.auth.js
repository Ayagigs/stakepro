import HttpException from "../exceptions/HttpException";
import userModel from "../models/user.model";
import hasToken from "./base.auth";

export async function userAuth(req, res, next) {
    try {
        const key = hasToken(req)
        const user = await userModel.findById(key)
        if (!user) throw new HttpException(401, "Unauthorized client")
        if (!user.isVerified) throw new HttpException(401, "email not verified")
        if (user.isBlocked) throw new HttpException(401, "account blocked")
        
        req["user"] = user
        next()
    } catch (err) {
        next(err)
    }
}