import Joi from "joi";

const resendVerificationSchema = Joi.object({
    email: Joi.string().email().required(),
})

export default resendVerificationSchema