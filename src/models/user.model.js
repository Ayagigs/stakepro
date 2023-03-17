import moment from 'moment';
import bcrypt from "bcrypt"
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    googleId: String,
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    first_name: String,
    last_name: String,
    password: {
        type: String,
        select: false,
    },
    phoneNumber: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    dob: {
        type: Date
    },
    address: {
        postalCode: {
            type: String,
        },
        city: {
            type: String,
        },
        address: {
            type: String,
        }
    },
    verifiedSelfie: String,
    isKycVerified: {
        type: Boolean,
        default: false
    },
    joinedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
})

userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const userModel = model('User', userSchema);
export default userModel;