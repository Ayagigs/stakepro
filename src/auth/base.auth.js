import HttpException from "../exceptions/HttpException"
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

function hasToken(req) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(" ")[1]
    if (!token) throw new HttpException(401, "Unauthorized")
    return jwt.verify(token, ACCESS_TOKEN).value
}

export default hasToken;