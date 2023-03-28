import HttpException from "../../exceptions/HttpException";
import { getTokenFromHeader } from "../../utils/jwt/get-token";
import { verifyToken } from "../../utils/jwt/verify-token";


export const isAdminLoggedIn = (req, res, next) => {
    // get token from header
    const token = getTokenFromHeader(req)
    if(!token) throw new HttpException(400,"It seems there was no token attached to the header!")
 
    const decodedUser = verifyToken(token);
    if (!decodedUser) {
        throw new HttpException(400,"Invalid token passed! Kindly login to generate new token thank you.")   
    }
    req.adminEmail = decodedUser.email
        next();
}