import Joi from "joi";


export const createAccountSchema = Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    // phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/) // pattern for phone number validation
    //     .required()
})

export const verifyAccountSchema = Joi.object({
    otp: Joi.number().min(1000).max(9999).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    password: Joi.string().required(),
})

export const resendVerificationSchema = Joi.object({
    email: Joi.string().email().required(),
})
 
