import Joi from "joi";

const createAccountSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

export default createAccountSchema