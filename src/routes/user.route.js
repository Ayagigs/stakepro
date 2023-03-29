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
    kycCredentials,
} from "../controller/user.controller";
import { Router } from "express";
import validatorMiddleware from "../middleware/validator.middleware";
import {
    createAccountSchema,
    loginSchema,
    resendVerificationSchema,
    resetPasswordSchema,
    verifyAccountSchema,
} from "../validator_schema/userAuthSchema";
import {
    kycCredentialSchema,
    kycOtpSchema,
    verifyKycOtpSchema,
} from "../validator_schema/kycSchema";

import passport from "passport";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN, fileParser, FRONTEND_URL } from "../config";
import { updateProfileSchema } from "../validator_schema/userProfileSchema";
import { userAuth } from "../auth/user.auth";
import { googleStrategy } from "../strategies/google.strategy";

googleStrategy();

const userRouter = Router({ mergeParams: true });

userRouter
    .route("/create")
    .post(validatorMiddleware(createAccountSchema, "body"), createAccount);

userRouter
    .route("/auth/google")
    .get(
        passport.authenticate("google", {
            scope: [
                "profile",
                "email",
                "https://www.googleapis.com/auth/user.phonenumbers.read",
            ],
            session: false,
        })
    );

userRouter
    .route("/auth/google/callback")
    .get(
        passport.authenticate("google", {
            failureRedirect: "/login",
            session: false,
        }),
        (req, res) => {
            const accessToken = jwt.sign({ value: req.user._id }, ACCESS_TOKEN, {
                expiresIn: "30d",
            });
            res.redirect(
                `${FRONTEND_URL}/app/?token=${accessToken}?kycVerified=${req.user.isKycVerified}`
            );
        }
    );

userRouter
    .route("/verify")
    .post(validatorMiddleware(verifyAccountSchema, "body"), verify);

userRouter
    .route("/verify/resend")
    .post(
        validatorMiddleware(resendVerificationSchema, "body"),
        resendVerificationMail
    );

userRouter
    .route("/login")
    .post(validatorMiddleware(loginSchema, "body"), loginAccount);

userRouter
    .route("/verify/reset-password")
    .post(
        validatorMiddleware(resendVerificationSchema, "body"),
        sendResetPasswordMail
    );

userRouter
    .route("/reset-password")
    .post(validatorMiddleware(resetPasswordSchema, "body"), resetPassword);

userRouter.route("/profile").get(userAuth, getProfile);

userRouter
    .route("/profile")
    .put(
        userAuth,
        validatorMiddleware(updateProfileSchema, "body"),
        updateProfile
    );

userRouter
    .route("/kyc")
    .post(
        userAuth,
        validatorMiddleware(kycCredentialSchema, "body"),
        kycCredentials
    );

userRouter.route("/kyc/photo").post(fileParser.single("photo"), uploadImg);

userRouter
    .route("/kyc/otp") 
    .post(userAuth, validatorMiddleware(kycOtpSchema, "body"), kycOtp);

userRouter
    .route("/kyc/otp/verify")
    .post(
        userAuth,
        validatorMiddleware(verifyKycOtpSchema, "body"),
        verifyKycOtp
    );

export default userRouter;
