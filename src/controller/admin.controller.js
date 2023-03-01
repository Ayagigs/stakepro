import HttpException from "../exceptions/HttpException"
import adminModel from "../models/admin.model";
import { validateEmail } from "../utils/email-validator"
import generateToken from "../utils/jwt/generate-token";
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
                text: `Kindly follow this link in order to continue with your registration process as an admin!
                <a href='http://localhost:8080/admin-registration-continuation?email=${email}&token=${generateToken(email)}'>sign up</a>`
              }
              await sendMail(mailOptions)
              return res.json({
                status: "success",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
              });
        }
        else {
            throw new HttpException(400,"Invaid Email!")
        }
        
    } catch (err) {
        next(err)
    }
}