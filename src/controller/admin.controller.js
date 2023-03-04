import HttpException from "../exceptions/HttpException"
import Admin from "../models/admin.model";
import { validateEmail } from "../utils/email-validator"
import { validateField } from "../utils/input-validator";
import generateToken from "../utils/jwt/generate-token";
import { extractEmailFromToken } from "../utils/jwt/verify-token";
import { passwordValidator } from "../utils/password-validator";
import sendMail from "../utils/sendMail";

export const registerEmail = async (req, res, next) => {
    const {email} = req.body
    try {
        if (validateEmail(email)) {
            const existingAdmin = await Admin.findOne({email})
            if (existingAdmin) {
                throw new HttpException(400,"Email already exists, kindly login")
            }
            const token = generateToken(email)
            const mailOption = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Admin account registration',
                text: `Dear ${email}, kindly follow this link in order to continue with your registration process as an admin!\n
                "http://localhost:8080/api/v1/admin/admin-registration-continuation?email=${email}&token=${token}"`
              }
              await sendMail(mailOption)
              const admin = await Admin.create({
                email
               });

              return res.json({
                status: "success",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
                token: token
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
            if (!extractEmailFromToken(token, email)) {
                throw new HttpException(400,"Invalid or expired token")
            }
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
        const id = req.params.id
        if (id) {
            const admin = await Admin.findOne({_id:id})
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
        
        if (email && password && validateEmail(email)) {
            const admin = await Admin.findOne({email})

            if (!admin) {
                throw new HttpException(400,"Incorrect Email or Password")
            }
            
            const passwordResult = await admin.isPasswordMatch(password)
            console.log("Password Result: ", passwordResult);
            if (!passwordResult) {
                console.log("Inside here");
                throw new HttpException(400,"Incorrect Email or Password")
            }
            if(!admin.isVerified) {
                throw new HttpException(400,"Unverified account")
            }
            return res.json({
                status: "success",
                message: `Dear ${admin.username}, welcome to the admin dashboard`,
                });
            
        }
        else {
            throw new HttpException(400,"Invalid Email!")
        }
        
    } catch (err) {
        next(err)
    }
}


