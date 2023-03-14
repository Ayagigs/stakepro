import Joi from "joi";


const kycOtpSchema = Joi.object({
    mobile: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required()
})

export default kycOtpSchema