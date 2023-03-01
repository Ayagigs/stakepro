import HttpException from "../exceptions/HttpException";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import emailTemplateReader from "../utils/emailTemplateReader";
import HttpResponse from "../response/HttpResponse";
import { ACCESS_TOKEN } from "../config";
import sendMail from "../utils/sendMail";


async function createAccount(req, res, next) {
    try {
        const data = req.body;
        const emailTaken = await userModel.findOne({ email: data.email });
        if (emailTaken) throw new HttpException(409, "email taken");

        const userTaken = await userModel.findOne({ username: data.username });
        if (userTaken) throw new HttpException(409, "username taken");

        const phoneNumberTaken = await userModel.findOne({ username: data.phoneNumber });
        if (phoneNumberTaken) throw new HttpException(409, "phone number taken");

        const verificationToken = jwt.sign({ value: data.email }, ACCESS_TOKEN, {
            expiresIn: "6000s",
        });

        const emailTemplate = await emailTemplateReader(`verify.hbs`, {
            username: data.username,
            link: `{verificationToken}`,
        });
        const newAccount = await userModel.create({ ...data });
        if (!newAccount)
            return res
                .status(500)
                .send(new HttpResponse("failed", "an error occurred"));

        await sendMail({
            to: data.email,
            subject: "verify account",
            html: emailTemplate,
        });
        return res
            .status(200)
            .send(new HttpResponse("success", "account created successfully"));
    } catch (err) {
        next(err);
    }
}

async function loginAccount(req, res, next) {
    const { password, email } = req.body;
    const findByEmail = await userModel.findOne({ email }).select("+password");
    if (!findByEmail)
        throw new HttpException(404, "incorrect username or email, and password");

    if (!(await findByEmail.isPasswordMatch(password)))
        throw new HttpException(404, "incorrect username or email, and password");

    if (!findByEmail.isVerified)
        throw new HttpException(403, "account is not verified");

    if (!findByEmail.isBlocked)
        throw new HttpException(403, "account is has been blocked");

    const accessToken = this.jwt.signJwt(user.username, "30d");
    return res
        .status(200)
        .send(
            new HttpResponse("success", "account authenticated", { accessToken })
        );
}

async function verify(req, res, next) {

}


async function resendVerificationMail(req, res, next) {

}

async function sendResetPasswordMail(req, res, next) {

}

async function resetPassword(req, res, next) {

}

export { createAccount };
