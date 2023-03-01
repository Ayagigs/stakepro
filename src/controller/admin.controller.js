import HttpException from "../exceptions/HttpException"
import adminModel from "../models/admin.model";
import { validateEmail } from "../utils/email-validator"
import sendMail from "../utils/sendMail";

export const registerEmail = async (req, res) => {
    try {
        const {email} = req.body
        if (validateEmail(email)) {
             await adminModel.create({
               email
              });
              let mailOptions = {
                from: process.env.clientEmail,
                to: email,
                subject: 'Admin account registration',
                text: 
              }
              await sendMail()
        }
        throw new HttpException(400,"Invaid Email!")
        
    } catch (err) {
        next(err)
    }
}