import moment from "moment";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        // unique: true,
        lowercase: true,
        trim: true,
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
        // select: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    addedAt: {
        type: Date,
        default: () => moment().toDate(),
    },
});

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

adminSchema.methods.isPasswordMatch = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("Admin7", adminSchema);
export default Admin;
