import HttpException from "../exceptions/HttpException"
import HttpResponse from "../response/HttpResponse";
import Admin from "../models/admin.model";
import { ACCESS_TOKEN } from "../config";
import userModel from "../models/user.model";
import { autoEmail } from "../service/user-email-service";
import sendMail from "../utils/sendMail";
import jwt from "jsonwebtoken";


export const registerEmail = async (req, res, next) => {
    const { email } = req.body
    try {
        const existingAdmin = await Admin.findOne({ email })

        if (existingAdmin) throw new HttpException(400, "Email already exists, kindly login")

        const token = jwt.sign({ email }, ACCESS_TOKEN, {
            expiresIn: "1d",
        });

        const mailOption = {
            to: email, 
            subject: 'Admin account registration',
            text: `Dear ${email}, kindly follow this link in order to continue with your registration process as an admin!\n
                "http://localhost:8080/api/v1/admin/admin-registration-continuation?email=${email}&token=${token}"`
        }

        await sendMail(mailOption)
        const admin = await Admin.create({
            email
        });

        if (!admin) throw new HttpException(500, "an error occurred")

        return res
            .status(200)
            .send(new HttpResponse("success", "A registration link has been successfully sent to your email, kindly continue your registration from there.", { token }));

    } catch (err) {
        next(err)
    }
}

export const updateAdminRecord = async (req, res, next) => {
    try {
        const { email, token } = req.query
    const { username, password } = req.body

        const decoded = jwt.decode(token, { complete: true });
        const payload = decoded.payload;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= payload.exp) throw new HttpException(401, "duration expired");
        if (email !== payload.email) throw new HttpException(401, "invalid email");

        const existingUsername = await Admin.findOne({ username })
        const existingEmail = await Admin.findOne({ email })

        if (existingEmail.isAccepted) throw new HttpException(409, "admitted already")
        if (existingUsername) throw new HttpException(409, "Username has already been taken")

        const admin = await Admin.findOne({ email })
        if (!admin) throw new HttpException(404, "email not registered")

        admin.username = username
        admin.password = password
        admin.isAccepted = true
        await admin.save();

        return res
            .status(200)
            .send(new HttpResponse("success", "Your account has been successfully created, you would be notified once your account is being activated."));

    }
    catch (err) {
        next(err)
    }
}

export const activateAdmin = async (req, res, next) => {
    try {
        const id = req.params.id
        const admin = await Admin.findOne({ _id: id })
        if (!admin) throw new HttpException(400, "No admin details found")

        if (admin.isVerified) throw new HttpException(400, "Admin has already been verified")
        admin.isVerified = true

        await admin.save()

        return res
            .status(200)
            .send(new HttpResponse("success", `${admin.username} account has now been activated.`));

    }
    catch (err) {
        next(err)
    }
}

export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const admin = await Admin.findOne({ email })

        if (!admin) throw new HttpException(404, "Incorrect Email or Password")

        if (!(await admin.isPasswordMatch(password))) throw new HttpException(404, "Incorrect Email or Password")

        if (!admin.isVerified) throw new HttpException(403, "Unverified account")

        return res
            .status(200)
            .send(new HttpResponse("success", `Dear ${admin.username}, welcome to the admin dashboard`));

    } catch (err) {
        next(err)
    }
}

export const adminProfileUpdate = async (req, res, next) => {
    try {
        const { id } = req.params
        if (!id) {
            throw new HttpException(400, "Invalid request")
        }
        else {
            const { firstname, lastname } = req.body
            const admin = await Admin.findOneAndUpdate(
                { _id: id },
                { firstname: firstname, lastname: lastname },
                { new: true, runValidators: true }
            )

            if (!admin) {
                throw new HttpException(400, "Admin not found")
            }

            return res
                .status(200)
                .send(new HttpResponse("success", `Dear ${admin.firstname}, your account has now been updated.`));

        }
    }
    catch (err) {
        next(err)
    }
}

export const adminsController = async (req, res, next) => {
    try {
        const admins = await Admin.find({})

        return res
            .status(200)
            .send(new HttpResponse("success", `fetched all admin successfully`, admins));

    }
    catch (error) {
        next(error)
    }
};

export const deleteAdminController = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (id) {
            const admin = await Admin.findOneAndDelete({ _id: id })
            if (!admin) {
                throw new HttpException(400, "Admin not found")
            }
            res.json({
                status: "success",
                message: "Account has been deleted successfully",
            });
        }
        else {
            throw new HttpException(400, "Invalid request")
        }
    }
    catch (error) {
        next(error)
    }
};

export const emailUsersController = async (req, res, next) => {
    const { subject, message, isVerified } = req.body
    try {
        let users
        if (isVerified === true) {
            users = await userModel.find({ isVerified: true })
        }
        else {
            users = await userModel.find({})
        }
        await autoEmail(users, subject, message, res)
    }
    catch (error) {
        next(error)
    }
};