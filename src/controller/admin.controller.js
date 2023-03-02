import HttpException from "../exceptions/HttpException"
import Admin from "../models/admin.model";
// import {adminModel} from "../models/admin.model";
// import adminModel from "../models/admin.model";
import { validateEmail } from "../utils/email-validator"
import generateToken from "../utils/jwt/generate-token";
import sendMail from "../utils/sendMail";

export const registerEmail = async (req, res, next) => {
    try {
        const {email} = req.body
        
        if (validateEmail(email)) {

            const existingAdmin = await Admin.findOne({email})

            if (existingAdmin) {
                  return res.json({
                status: "error",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
              });
            }

            const admin = await Admin.create({
                email
               });

              let mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Admin account registration',
                text: `Dear ${email}, kindly follow this link in order to continue with your registration process as an admin!
                <a href='http://localhost:8080/admin-registration-continuation?email=${email}&token=${generateToken(email)}'>sign up</a>`
              }
              await sendMail(mailOptions)

              return res.json({
                status: "success",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
                body: admin,
              });
            //   return res.json({
            //     status: "success",
            //     message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
            //   });
        }
        else {

            throw new HttpException(400,"Invaid Email!")
        }
        
    } catch (err) {
        next(err)
    }
}

export const updateAdminRecord = async (req, res, next) => {
    try {
        const {email, token} = req.query

        if (email && token) {
            const admin = await Admin.findOne({email})
            if (!admin) {
                return res.json({
                    status: "error",
                    message: "Invalid email",
                  });
            }
            
            const existingAdmin = 



        }

        else {
            return res.json({
                status: "error",
                message: "Invalid request",
              });
        }

        



    }
    catch (err) {
        next(err)
    }
}

