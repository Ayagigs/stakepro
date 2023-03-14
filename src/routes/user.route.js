import {
    createAccount,
    resendVerificationMail,
    loginAccount,
    resetPassword,
    sendResetPasswordMail,
    verify,
    updateProfile,
    uploadImg,
    kycOtp,
    verifyKycOtp,
    getProfile,
    kycCredentials
} from "../controller/user.controller";
import { Router } from "express";
import validatorMiddleware from "../middleware/validator.middleware";
import createAccountSchema from "../validator_schema/createAccountShema";
import verifyAccountSchema from "../validator_schema/verifyAccountSchema";
import verifyKycOtpSchema from "../validator_schema/verifyKycOtpSchema";
import loginSchema from "../validator_schema/loginSchema";
import resetPasswordSchema from "../validator_schema/resetPasswordSchema";
import resendVerificationSchema from "../validator_schema/resendVerificationSchema";
import kycCredentialSchema from "../validator_schema/kycCredentialSchema";
import passport from "passport"
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, fileParser } from "../config";
import updateProfileSchema from "../validator_schema/updateProfileSchema"
import { userAuth } from "../auth/user.auth";
import { googleStrategy } from "../strategies/google.strategy"
import kycOtpSchema from "../validator_schema/kycOtpSchema";


googleStrategy();

const userRouter = Router({ mergeParams: true });


userRouter
    .route("/create")
    .post(
        validatorMiddleware(createAccountSchema, "body"),
        createAccount
    );

userRouter
    .route("/auth/google")
    .get(passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/user.phonenumbers.read'], session: false }));

userRouter.route('/auth/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
        const accessToken = jwt.sign({ value: req.user._id }, ACCESS_TOKEN, {
            expiresIn: "30d",
        });
        res.redirect(`http://127.0.0.1:1420/?token=${accessToken}`);
    });

userRouter
    .route("/verify")
    .post(
        validatorMiddleware(verifyAccountSchema, "body"),
        verify
    );

userRouter
    .route("/verify/resend")
    .post(
        validatorMiddleware(resendVerificationSchema, "body"),
        resendVerificationMail
    );

userRouter
    .route("/login")
    .post(validatorMiddleware(loginSchema, "body"),
        loginAccount
    );

userRouter
    .route("/verify/reset-password")
    .post(
        validatorMiddleware(resendVerificationSchema, "body"),
        sendResetPasswordMail
    );

userRouter
    .route("/reset-password")
    .post(
        validatorMiddleware(resetPasswordSchema, "body"),
        resetPassword
    );

userRouter.route("/profile")
    .get(
        userAuth,
        getProfile
    )

userRouter.route("/profile")
    .put(
        userAuth,
        validatorMiddleware(updateProfileSchema, "body"),
        updateProfile
    )

userRouter.route("/kyc")
    .post(
        userAuth,
        validatorMiddleware(kycCredentialSchema, "body"),
        kycCredentials
    )

userRouter.route("/kyc/photo")
    .post(
        fileParser.single("photo"),
        uploadImg
    )

userRouter.route("/kyc/otp")
    .post(
        userAuth,
        validatorMiddleware(kycOtpSchema, "body"),
        kycOtp
    )

userRouter.route("/kyc/otp/verify")
    .post(
        userAuth,
        validatorMiddleware(verifyKycOtpSchema, "body"),
        verifyKycOtp
    )

export default userRouter;
