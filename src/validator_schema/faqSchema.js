import Joi from "joi";

export const faqIdSchema = Joi.object({
    id: Joi.string().required(),
})

export const createSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
    addedBy: Joi.string(),
})