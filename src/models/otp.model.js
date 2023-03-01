import moment from "moment";
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";

const otpSchema = new Schema({
    otp: {
        type: String,
        required: true,
        unique: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
})

const otpModel = model("Otp", otpSchema);
export default otpModel;