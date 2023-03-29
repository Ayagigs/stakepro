import HttpException from "../exceptions/HttpException";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import emailTemplateReader from "../utils/emailTemplateReader";
import HttpResponse from "../response/HttpResponse";
import { ACCESS_TOKEN, FRONTEND_URL, IPINFO_TOKEN, nexmo } from "../config";
import sendMail from "../utils/sendMail";
import randomstring from "randomstring";
import otpModel from "../models/otp.model";
import logger from "../utils/logger";
import ipinfo from "ipinfo"
import requestIp from "request-ip"


export async function createAccount(req, res, next) {
    try {

        const data = req.body;
        const emailTaken = await userModel.findOne({ email: data.email });
        if (emailTaken) throw new HttpException(409, "email taken");

        const newAccount = await userModel.create({ ...data });
        if (!newAccount) throw new HttpException(500, "an error occurred");

        await sendVerificationMail(data.email);

        const accessToken = jwt.sign({ value: newAccount._id }, ACCESS_TOKEN, {
            expiresIn: "30d",
        });

        return res
            .status(200)
            .send(new HttpResponse("success", "account created successfully", { accessToken, kycVerified: false }));
    } catch (err) {
        next(err);
    }
}

export async function loginAccount(req, res, next) {
    try {

        const ipAddress = requestIp.getClientIp(req)

        const { password, email } = req.body;
        const findByEmail = await userModel.findOne({ email }).select("+password");
        if (!findByEmail)
            throw new HttpException(404, "incorrect username or email, and password");

        if (!(await findByEmail.isPasswordMatch(password)))
            throw new HttpException(404, "incorrect username or email, and password");

        if (!findByEmail.isVerified)
            throw new HttpException(403, "email is not verified");

        if (findByEmail.isBlocked)
            throw new HttpException(403, "account is has been blocked");

        const accessToken = jwt.sign({ value: findByEmail._id }, ACCESS_TOKEN, {
            expiresIn: "30d",
        });

        const data = await ipinfo(ipAddress, { token: IPINFO_TOKEN });
        await sendMail({
            to: email,
            subject: "acccount login",
            html: `Location for ${data.ip}: ${data.city}, ${data.region}, ${data.country}`,
        });

        return res
            .status(200)
            .send(
                new HttpResponse("success", "account authenticated", { accessToken, kycVerified: findByEmail.isKycVerified })
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
        if (user.isVerified) throw new HttpException(400, "account already verified");
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
        length: 4,
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
            link: `${FRONTEND_URL}/reset-password?token=${verificationToken}`,
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

export async function getProfile(req, res, next) {
    try {
        const { email, username, first_name, last_name, phoneNumber, isVerified, isBlocked, address, isKycVerified } = req["user"]
        return res
            .status(200)
            .send(new HttpResponse("success", `${email} profile`, {
                email,
                username,
                first_name,
                last_name,
                phoneNumber,
                isEmailVerified: isVerified,
                isBlocked,
                address,
                isKycVerified
            }));
    } catch (err) {
        next(err);
    }
}

export async function updateProfile(req, res, next) {
    try {
        const user = req["user"]
        const data = req.body
        const foundUser = await userModel.findOneAndUpdate({ _id: user._id }, { ...data })
        await foundUser.save();
        return res
            .status(200)
            .send(new HttpResponse("success", "profile updated"));
    } catch (err) {
        next(err);
    }
}

export async function uploadImg(req, res, next) {
    try {
        if (!req.file) throw new HttpException(400, "field is required")
        return res.status(200).send(new HttpResponse("success", "image uploaded", { url: req.file.path }));
    } catch (err) {
        console.log(err)
        console.log(req.file)

        next(err)
    }
}

export async function kycOtp(req, res, next) {
    try {
        const { mobile } = req.body

        const verificationToken = jwt.sign({ value: mobile }, ACCESS_TOKEN, {
            expiresIn: "5m",
        });

        const OTP = randomstring.generate({
            length: 4,
            charset: "numeric",
        });

        nexmo.message.sendSms(
            "Stakepro",
            mobile,
            `Verification otp\n ${OTP}`,
            async (err, responseData) => {
                try {
                    logger.error(err);
                    if (err) throw new HttpException(500, "otp could not be sent");
                    logger.info("responseData==> " + responseData)
                    const addedOtp = await otpModel.create({
                        key: verificationToken,
                        otp: OTP,
                    });
                    if (!addedOtp) throw new HttpException(500, "otp could not be sent");
                    return res.status(200).send(new HttpResponse("success", "otp resent"));
                } catch (err) {
                    next(err)
                }
            }
        )

    } catch (err) {
        next(err)
    }
}

export async function verifyKycOtp(req, res, next) {
    try {
        const { otp } = req.body;
        const user = req["user"]

        const confirmedOtp = await otpModel.findOne({ otp });
        if (!confirmedOtp) throw new HttpException(400, "invalid otp");

        const decoded = jwt.decode(confirmedOtp.key, { complete: true });
        const { exp, value } = decoded.payload;

        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= exp) throw new HttpException(401, "otp has expired");

        user.phoneNumber = value;
        await user.save();
        return res.status(200).send(new HttpResponse("success", "otp verified successfully"));
    } catch (err) {
        next(err)
    }
}

export async function kycCredentials(req, res, next) {
    try {
        const data = req.body
        const { email, phoneNumber } = req["user"]
        if (!phoneNumber) throw new HttpException(400, "verify phone number");

        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { ...data, isKycVerified: true },
            { new: true }
        );
        if (updatedUser) return res.status(200).send(new HttpResponse("success", "done with kyc successfully"));
    } catch (err) {
        next(err)
    }
}

export async function logout(req, res, next) {

}