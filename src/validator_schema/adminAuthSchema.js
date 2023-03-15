import Joi from "joi";

export const registerEmailSchema = Joi.object({
    email: Joi.string().email().required(),
})

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/


export const verifyAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
})

export const adminCredentialsSchema = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    username: Joi.string().min(6).required(),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})

export const activateAdminSchema = Joi.object({
    id: Joi.string().required(),
})