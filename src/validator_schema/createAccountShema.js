import Joi from "joi";

const createAccountSchema = Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber:Joi.number().required()
})

export default createAccountSchema