import Joi from "joi";

export const writeBlogSchema = Joi.object({
    displayname: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required()
});

export const updateBlogSchema = Joi.object({
    displayname: Joi.string(),
    title: Joi.string(),
    content: Joi.string()
});

export const newsEmailSchema = Joi.object({
    name:Joi.string(),
    email:Joi.string().email()
})

export const supportSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    subject: Joi.string().required(),
    message:Joi.string().required()
    
});
