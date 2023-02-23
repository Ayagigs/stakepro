import HttpException from "../exceptions/HttpException"
import jwt from "jsonwebtoken"
import { ACCESS_TOKEN } from "../config"

const hasToken = async (req, res, next) => {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(" ")[1]
    if (!token) throw new HttpException(401, "no auth key")
    const verifiedToken = jwt.verify(ACCESS_TOKEN)
    return verifiedToken
}

export default hasToken