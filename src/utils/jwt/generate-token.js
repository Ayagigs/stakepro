import jwt from "jsonwebtoken"

const generateToken = (email, role) => {
    return jwt.sign(
        {email, role}, process.env.JWT_KEY, 
        {expiresIn: process.env.JWT_EXPIRATION_TIME}
    )
}

export default generateToken;