import jwt from "jsonwebtoken"
import { ACCESS_TOKEN, JWT_EXPIRATION_TIME } from "../../config"
const generateToken = (email, role) => {
    return jwt.sign(
        { email, role }, ACCESS_TOKEN,
        { expiresIn: JWT_EXPIRATION_TIME }
    )
}

export default generateToken;