import HttpException from "../exceptions/HttpException";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import emailTemplateReader from "../utils/emailTemplateReader";
import HttpResponse from "../response/HttpResponse";
import { ACCESS_TOKEN, WEB_URL } from "../config";
import sendMail from "../utils/sendMail";
import randomstring from "randomstring";
import otpModel from "../models/otp.model";

export async function createAccount(req, res, next) {
    try {
      
        const data = req.body;
        const emailTaken = await userModel.findOne({ email: data.email });
        if (emailTaken) throw new HttpException(409, "email taken");

        const newAccount = await userModel.create({ ...data });
        if (!newAccount) throw new HttpException(500, "an error occurred");

        await sendVerificationMail(data.email);

        return res
            .status(200)
            .send(new HttpResponse("success", "account created successfully"));
    } catch (err) {
        next(err);
    }
}

export async function loginAccount(req, res, next) {
    try {
        const { password, email } = req.body;
        const findByEmail = await userModel.findOne({ email }).select("+password");
        if (!findByEmail)
            throw new HttpException(404, "incorrect username or email, and password");

        if (!(await findByEmail.isPasswordMatch(password)))
            throw new HttpException(404, "incorrect username or email, and password");

        if (!findByEmail.isVerified)
            throw new HttpException(403, "account is not verified");

        if (findByEmail.isBlocked)
            throw new HttpException(403, "account is has been blocked");

        const accessToken = jwt.sign({ value: findByEmail._id }, ACCESS_TOKEN, {
            expiresIn: "30d",
        });

        return res
            .status(200)
            .send(
                new HttpResponse("success", "account authenticated", { accessToken })
            );
    } catch (err) {
        next(err);
    }
}

export async function verify(req, res, next) {
    try {
        const { otp } = req.body;

        const confirmedOtp = await otpModel.findOne({ otp });
        if (!confirmedOtp) throw new HttpException(400, "invalid otp");

        const decoded = jwt.decode(confirmedOtp.key, { complete: true });
        const { exp, value } = decoded.payload;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= exp) throw new HttpException(401, "otp has expired");

        const user = await userModel.findOne({ email: value });
        user.isVerified = true;
        await user.save();

        return res
            .status(200)
            .send(new HttpResponse("success", "account verified successfully"));
    } catch (err) {
        next(err);
    }
}

async function sendVerificationMail(email) {
    const verificationToken = jwt.sign({ value: email }, ACCESS_TOKEN, {
        expiresIn: "1h",
    });

    const OTP = randomstring.generate({
        length: 6,
        charset: "numeric",
    });

    const addedOtp = await otpModel.create({
        key: verificationToken,
        otp: OTP,
    });

    if (!addedOtp) throw new HttpException(500, "an error occurred");

    const emailTemplate = await emailTemplateReader(`verify.hbs`, {
        otp: OTP,
    });

    await sendMail({
        to: email,
        subject: "verify account",
        html: emailTemplate,
    });
} 

export async function resendVerificationMail(req, res, next) {
    try {
        const { email } = req.body;

        const foundEmail = await userModel.findOne({ email });
        if (!foundEmail) throw new HttpException(404, "email not found");

        if (foundEmail.isVerified) throw new HttpException(403, "account verified");

        await sendVerificationMail(email);

        return res.status(200).send(new HttpResponse("success", "email resent"));
    } catch (err) {
        next(err);
    }
}

export async function sendResetPasswordMail(req, res, next) {
    try {
        const { email } = req.body;

        const findByEmail = await userModel.findOne({ email });
        if (!findByEmail) throw new HttpException(404, "invalid email");

        const verificationToken = jwt.sign({ value: email }, ACCESS_TOKEN, {
            expiresIn: "1h",
        });

        const emailTemplate = await emailTemplateReader(`reset-password.hbs`, {
            link: `${WEB_URL}/reset-password/${verificationToken}`,
        });

        await sendMail({
            to: email,
            subject: "reset password",
            html: emailTemplate,
        });

        return res
            .status(200)
            .send(new HttpResponse("success", "reset password mail sent"));
    } catch (err) {
        next(err);
    }
}

export async function resetPassword(req, res, next) {
    try {
        const { token, confirmPassword, password } = req.body

        const decoded = jwt.decode(token, { complete: true });
        const { exp, value } = decoded.payload;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= exp) throw new HttpException(401, "token has expired");

        if (password !== confirmPassword) throw new HttpException(400, "password do not match");

        const findByEmail = await userModel.findOne({ email: value });
        if (!findByEmail) throw new HttpException(404, "invalid email");

        findByEmail.password = password;
        await findByEmail.save();

        return res
            .status(200)
            .send(new HttpResponse("success", "password reset"));

    } catch (err) {
        next(err);
    }
}
