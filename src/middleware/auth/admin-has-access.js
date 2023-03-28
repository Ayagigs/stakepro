import HttpException from "../../exceptions/HttpException";
import { getTokenFromHeader } from "../../utils/jwt/get-token";
import { verifyToken } from "../../utils/jwt/verify-token";

export const hasAccess = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    if(!token) throw new HttpException(400,"It seems there was no token attached to the header!")

    const decodedUser = verifyToken(token);
    req.role = decodedUser.role

    if (!decodedUser || decodedUser.role !== 'ADMIN') {
        throw new HttpException(401,"Unauthorized")
    }
        next();
}