import { model, Schema } from "mongoose";

// schema for user collection
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

// model for user collection
const User = model("User", schema);

// exporting model
export default User;