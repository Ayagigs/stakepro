import jwt from "jsonwebtoken"

export const verifyToken = token => {
    return jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
        if (error) return false
        return decoded 
    })
}