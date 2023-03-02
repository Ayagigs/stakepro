import Joi from "joi";
import { PhoneNumberUtil } from "google-libphonenumber"


const phoneUtil = PhoneNumberUtil.getInstance();
import logger from "../utils/logger"

const createAccountSchema = Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/) // pattern for phone number validation
        .required()

})

export default createAccountSchema