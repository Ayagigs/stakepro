import Joi from "joi";

const verifyAccountSchema = Joi.object({
    otp: Joi.number().required(),
})

export default verifyAccountSchema