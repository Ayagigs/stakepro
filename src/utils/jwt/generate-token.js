import jwt from "jsonwebtoken"

const generateToken = (email, role) => {
    return jwt.sign(
        {email, role}, process.env.ACCESS_TOKEN, 
        {expiresIn: process.env.JWT_EXPIRATION_TIME}
    )
}

export default generateToken;