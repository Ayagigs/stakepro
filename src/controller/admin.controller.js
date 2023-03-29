import HttpException from "../exceptions/HttpException"
import Admin from "../models/admin.model";
// import userModel from "../models/user.model";
import { autoEmail } from "../service/user-email-service";
import { htmlTemplate } from "../utils/email-template";
import { validateEmail } from "../utils/email-validator"
import { validateField } from "../utils/input-validator";
import generateToken from "../utils/jwt/generate-token";
import { extractEmailAndRoleFromToken} from "../utils/jwt/verify-token";
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
            const token = generateToken(email, 'ADMIN')
            const mailOption = {
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Admin account registration',
                html: htmlTemplate(process.env.BASE_URL, email.substring(0, email.indexOf('@')), email, token)

              }
              await sendMail(mailOption)
            //   const admin = await Admin.create({
            //     email
            //    });

              return res.json({
                status: "success",
                message: "A registration link has been successfully sent to your email, kindly continue your registration from there.",
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
            if (!extractEmailAndRoleFromToken(token, email, 'ADMIN')) {
                throw new HttpException(400,"Invalid or expired token")
            }
            // const decoded = jwt.decode(token, {complete: true})
            // const payload = decoded.payload

            // const currentTime = Math.floor(Date.now() / 1000)

            // if (currentTime >= payload.exp) {
            //     throw new HttpException(400,"duration expired")
            // }

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

            const admin = await Admin.create({
                email,
                username,
                password,
                isAccepted: true
               });

            return res.json({
                status: "success",
                message: "Your account has been successfully created, you would be notified once your account is being activated.",
                data: admin
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
            const admin = await Admin.findOne({email}).select("+password")

            if (!admin) {
                throw new HttpException(400,"Incorrect Email or Password")
            }
            
            const passwordResult = await admin.isPasswordMatch(password)
            console.log('Password Result: ', passwordResult);
            if (!passwordResult) {
                throw new HttpException(400,"Incorrect Email or Password")
            }
            if(!admin.isVerified) {
                throw new HttpException(400,"Unverified account")
            }
            return res.json({
                status: "success",
                message: `Dear ${admin.username}, welcome to the admin dashboard`,
                token: generateToken(admin.email, admin.roles)
                });
            
        }
        else {
            throw new HttpException(400,"Invalid Email!")
        }
        
    } catch (err) {
        next(err)
    }
}

export const adminProfileUpdate = async (req, res, next) => {
    try {
        const {id} = req.params
        if (!id) {
            throw new HttpException(400,"Invalid request")
        }
        else {
            const {firstname, lastname} = req.body
            const admin = await Admin.findOneAndUpdate(
                {_id: id}, 
                {firstname: firstname, lastname: lastname},
                {new: true, runValidators: true}
              )

              if (!admin) {
                throw new HttpException(400,"Admin not found")
              }

            return res.json({
                status: "success",
                message: `Dear ${admin.firstname}, your account has now been updated.`,
              });
            
        }
    }
    catch (err) {
        next(err)
    }
}

export const adminsController = async (req, res, next) => {
    try {
      const admins = await Admin.find({})
      res.json({
        status: "success",
        data: admins,
      });
    } 
    catch (error) {
        next(error)
    }
  };

export const deleteAdminController = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (id) {
            const admin = await Admin.findOneAndDelete({_id: id})
            if (!admin) {
                throw new HttpException(400,"Admin not found")
            }
            res.json({
                status: "success",
                message: "Account has been deleted successfully",
            });
        }
        else {
            throw new HttpException(400,"Invalid request")
        }
    } 
    catch (error) {
        next(error)
    }
  };

  export const emailUsersController = async (req, res, next) => {
    const {subject, message, isVerified} = req.body
    try {
      let users
      if (isVerified === true) {
          users = await Admin.find({isVerified: true})
        }
        else {
          users = await Admin.find({})
      }
      await autoEmail(users, subject, message, res)
    } 
    catch (error) {
        next(error)
    }
  };

