import Joi from "joi";

export const blogSchema = Joi.object({
    img: Joi.string().required(),
    title: Joi.string().required(),
    body: Joi.string().required(),
})
export const blogIdSchema = Joi.object({
    id: Joi.string().required(),
})

