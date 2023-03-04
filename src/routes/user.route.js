import {
    createAccount,
    resendVerificationMail,
    loginAccount,
    resetPassword,
    sendResetPasswordMail,
    verify
} from "../controller/user.controller";
import { Router } from "express";
import validatorMiddleware from "../middleware/validator.middleware";
import createAccountSchema from "../validator_schema/createAccountShema";
import verifyAccountSchema from "../validator_schema/verifyAccountSchema";
import loginSchema from "../validator_schema/loginSchema";
import resetPasswordSchema from "../validator_schema/resetPasswordSchema";
import resendVerificationSchema from "../validator_schema/resendVerificationSchema";
import passport from "passport"

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
        res.redirect('http://127.0.0.1:1420/');
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

export default userRouter;
