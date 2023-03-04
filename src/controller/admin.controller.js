import HttpException from "../exceptions/HttpException"
import Admin from "../models/admin.model";
// import {adminModel} from "../models/admin.model";
// import adminModel from "../models/admin.model";
import { validateEmail } from "../utils/email-validator"
import { validateField } from "../utils/input-validator";
import generateToken from "../utils/jwt/generate-token";
import { passwordValidator } from "../utils/password-validator";
import sendMail from "../utils/sendMail";

export const registerEmail = async (req, res, next) => {
    try {
        const {email} = req.body
        
        if (validateEmail(email)) {

            const existingAdmin = await Admin.findOne({email})

            if (existingAdmin) {
                throw new HttpException(400,"Email already exists, kindly login")
            }

            const admin = await Admin.create({
                email
               });

              let mailOptions = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Admin account registration',
                text: `Dear ${email}, kindly follow this link in order to continue with your registration process as an admin!
                <a href='http://localhost:8080/api/v1/admin/admin-registration-continuation?email=${email}&token=${generateToken(email)}'>sign up</a>`
              }
              await sendMail(mailOptions)

              return res.json({
                status: "success",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
                body: admin,
              });
        }
        else {

            throw new HttpException(400,"Invalid Email!")
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
                throw new HttpException(400,"Invalid email")
            }

            const {username, password} = req.body

            if (!validateField(username)) {
                throw new HttpException(400,"Username must not be less than 6 characters long")
            }

            const existingAdmin = await Admin.findOne({username})
            if (existingAdmin) {
                throw new HttpException(400,"Username has already been taken")
            }
            
            if (!passwordValidator(password)) {
                throw new HttpException(
                    400,
                    "Password must contain a number, a special character, an uppercase letter, and not less than 8 characters long"
                    )
            }

            admin.username = username
            admin.password = password
            admin.isAccepted = true
            await admin.save();

            return res.json({
                status: "success",
                message: "Your account has been successfully created, you would be notified once your account is being activated.",
              });
        }

        else {
            throw new HttpException(400,"Invalid request")
        }

    }
    catch (err) {
        next(err)
    }
}

export const activateAdmin = async (req, res, next) => {
    try {
        const {id} = req.params.id
        if (id) {
            const admin = await Admin.findOne({id})
            if (!admin) {
                throw new HttpException(400,"No admin details found")
            }
            if (admin.isVerified) {
                throw new HttpException(400,"Admin has already been verified")
            }
            admin.isVerified = true
            await admin.save()
            return res.json({
                status: "success",
                message: `${admin.username} account has now been activated.`,
              });

        }
        else {
            throw new HttpException(400,"Invalid request")
        }
    }
    catch (err) {
        next(err)
    }
}

export const adminLogin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        
        if (validateEmail(email)) {
            const admin = await Admin.findOne({email})

            if (!admin || !admin.isPasswordMatch(password)) {
                throw new HttpException(400,"Incorrect Email or Password")
            }
            else if(!admin.isVerified) {
                throw new HttpException(400,"Unverified account")
            }
            else {
                return res.json({
                    status: "success",
                    message: `Dear ${admin.username}, welcome to the admin dashboard`,
                  });
            }
        }
        else {
            throw new HttpException(400,"Invalid Email!")
        }
        
    } catch (err) {
        next(err)
    }
}


