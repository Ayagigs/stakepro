import moment from "moment";
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    otp: {
        type: String,
    },
    key: {
        type: String,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
})

const otpModel = model("Otp", otpSchema);
export default otpModel;