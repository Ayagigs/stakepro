import HttpException from "../exceptions/HttpException"
import { validateEmail } from "../utils/email-validator"

export const registerEmail = async (req, res) => {
    try {
        const {email} = req.body
        if (validateEmail(email)) {
              
             await Medicine.create({
               email
              });
        }
        throw new HttpException(400,"Invaid Email!")
        
    } catch (err) {
        next(err)
    }
}