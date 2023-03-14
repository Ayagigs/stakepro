import Joi from "joi";


export const kycOtpSchema = Joi.object({
    mobile: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).required()
})

const IMAGE_EXTENSION_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;


export const kycCredentialSchema = Joi.object({
    dob: Joi.date(),
    address: Joi.object({
        postalCode: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required()
    }),
    verifiedSelfie: Joi.string().regex(IMAGE_EXTENSION_REGEX).required()
});

export const verifyKycOtpSchema = Joi.object({
    otp: Joi.number().min(1000).max(9999).required(),
})