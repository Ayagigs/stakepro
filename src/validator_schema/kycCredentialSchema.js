import Joi from 'joi';

const IMAGE_EXTENSION_REGEX = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

const kycCredentialSchema = Joi.object({
    dob: Joi.date(),
    address: Joi.object({
        postalCode: Joi.string().required(),
        city: Joi.string().required(),
        address: Joi.string().required()
    }),
    verifiedSelfie: Joi.string().regex(IMAGE_EXTENSION_REGEX).required()
});

export default kycCredentialSchema;
