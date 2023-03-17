import Joi from "joi";

const verifyAccountSchema = Joi.object({
    otp: Joi.number().min(1000).max(9999).required(),
})

export default verifyAccountSchema