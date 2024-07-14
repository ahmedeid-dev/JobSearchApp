import { model, Schema } from "mongoose";

const schema = Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: String,
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    recoveryEmail: {
        type: String,
        unique: false,
    },
    DOB: {
        type: Date,
        trim: true,
        format: "yyyy-mm-dd",
    },
    mobile: {
        type: String,
        unique: true,
        length: 11
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "Company_HR "],
    },
    status: {
        type: String,
        default: "offline",
        enum: ["online", "offline"],
    },
    otp: {
        type: String
    },
    expiredotp: {
        type: Date
    }
}, {
    versionKey: false
});

const User = model("User", schema);

export default User;