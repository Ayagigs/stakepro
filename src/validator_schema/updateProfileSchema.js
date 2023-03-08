import Joi from "joi";

const updateProfileSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
})

export default updateProfileSchema