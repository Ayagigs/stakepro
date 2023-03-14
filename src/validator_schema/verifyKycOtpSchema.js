import Joi from "joi";

const verifyKycOtpSchema = Joi.object({
    otp: Joi.number().min(1000).max(9999).required(),
})

export default verifyKycOtpSchema