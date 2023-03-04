import Joi from "joi";

export const createAccountSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    age:Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const writeBlogSchema = Joi.object({
    displayname: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required()
});
