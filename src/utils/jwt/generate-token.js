import jwt from "jsonwebtoken"

const generateToken = (email) => {
    return jwt.sign(
        {email}, process.env.JWT_KEY, 
        {expiresIn: process.env.JWT_EXPIRATION_TIME}
    )
}

export default generateToken;