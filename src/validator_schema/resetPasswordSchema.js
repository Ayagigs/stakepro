import Joi from "joi";

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    password: Joi.string().required(),
})

export default resetPasswordSchema