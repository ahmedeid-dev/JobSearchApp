import User from "./../../database/model/userCollection/user.model.js";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { sendEmailService } from "../../email/sendEmail.js";
import { resetPasswordTemplate } from "../../email/emailHtml.js";

const signup = async (req, res, next) => {
    req.body.userName = `${req.body.firstName} ${req.body.lastName}`;
    const user = await User.create(req.body);
    user.password = undefined
    res.status(201).json({ message: "User created successfully", user });
};
const signin = async (req, res, next) => {
    const user = await User.findOneAndUpdate({
        $or: [
            { email: req.body.email },
            { recoveryEmail: req.body.recoveryEmail },
            { mobile: req.body.mobile },
        ]
    },
        { status: "online" },
        { new: true }
    );
    const token = jwt.sign(
        {
            id: user._id,
            userName: user.userName,
            role: user.role,
            status: user.status
        }
        , "LoginjwtPrivateKey",
        {
            expiresIn: 10000
        })

    user.status = undefined
    user.role = undefined
    user.password = undefined

    res.status(200).json({ message: "User signed in successfully", user, token });
};

const updateUser = async (req, res, next) => {
    const data = await User.findById(req.user.id);
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            $set: {
                email: req.body.email,
                mobile: req.body.mobile,
                recoveryEmail: req.body.recoveryEmail,
                DOB: req.body.DOB,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                userName: `${req.body.firstName ? req.body.firstName : data.firstName} ${req.body.lastName ? req.body.lastName : data.lastName}`,
            }
        },
        { new: true },
    )

    user.password = undefined
    res.status(200).json({ message: "User updated successfully", user })
};

const deleteUser = async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.user.id)
    user.password = undefined
    res.status(200).json({ message: "User deleted successfully", user })
};

const getUser = async (req, res, next) => {
    const user = await User.findById(req.user.id)

    user.status = undefined
    user.role = undefined
    user.password = undefined

    res.status(200).json({ message: "User fetched successfully", user })
};

const updatePassword = async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            $set: {
                password: req.body.password
            }
        },
        { new: true },
    )

    user.password = undefined
    res.status(200).json({ message: "password updated successfully", user })
};


const getAllAccounts = async (req, res, next) => {
    const users = await User.find({ recoveryEmail: req.query.recoveryEmail }, { password: 0 })

    res.status(200).json({ message: "Users fetched successfully", users })
};

const GetProfileDataForAnotherUser = async (req, res, next) => {
    const user = await User.findById(req.query.id, { password: 0 })

    user.password = undefined

    res.status(200).json({ message: "User fetched successfully", user })
};
const resetPassword = async (req, res, next) => {
    // destructure user email and new password and otp from body
    const { email, otp, newPassword } = req.body
    // check if user exists
    const user = await User.findOne({ email })
    // check if otp is expired
    if (Date.now() > user.expiredotp) {
        return next(new appError("otp expired", 400))
    }
    // check if otp is matched
    const isotpMatched = compareSync(otp, user.otp);
    if (!isotpMatched) {
        return next(new appError("otp is wrong", 400));
    }
    // hash new password
    const hashedPassword = hashSync(newPassword, 10);
    // update user password in DB and unset otp and expiredotp
    const updatedUser = await User.updateOne(
        { email },
        {
            $set: { password: hashedPassword },
            $unset: { otp: "", expiredotp: "" }
        },
        { new: true }).select("-password");
    res.status(200).json({ message: "password reset successfully", updatedUser });
}
// const forgetPassword = async (req, res, next) => {

//     // check if user exists
//     const user = await User.findOne({ email })

//     // generate otp
//     const otp = Math.floor(Math.random() * 1000000 + 1);
//     // send otp to email
//     const isEmailSend = await sendEmailService(
//         {
//             to: email,
//             subject: "reset password",
//             htmlMessage: resetPasswordTemplate(user.firstName, otp),
//         }
//     );
//     // if email not sent return error
//     if (isEmailSend.rejected.length) {
//         return res.status(400).json({ message: "Email not sent" });
//     }
//     // hash otp and save it in DB
//     const hashedotp = hashSync(`${otp}`, 10);
//     user.otp = hashedotp
//     // set expired time for otp 10 minutes
//     user.expiredotp = Date.now() + 10 * 60 * 1000
//     user.save()
//     res.status(200).json({ message: "check your email for reset password" });
// }

const forgetPassword = async (req, res, next) => {
    // destructure user email from body
    const { email } = req.body
    // check if user exists
    const user = await User.findOne({
        $or: [
            { email: req.body.email },
            { recoveryEmail: req.body.recoveryEmail },
            { mobile: req.body.mobile },
        ]
    },)
    // generate otp
    const otp = Math.floor(Math.random() * 1000000 + 1);
    // send otp to email
    const isEmailSend = await sendEmailService(
        {
            to: email,
            subject: "reset password",
            htmlMessage: resetPasswordTemplate(user.firstName, otp),
        }
    );
    // if email not sent return error
    if (isEmailSend.rejected.length) {
        return res.status(400).json({ message: "Email not sent" });
    }
    // hash otp and save it in DB
    const hashedotp = hashSync(`${otp}`, 8);
    user.otp = hashedotp
    // set expired time for otp 10 minutes
    user.expiredotp = Date.now() + 10 * 60 * 1000
    user.save()
    res.status(200).json({ message: "check your email for reset password" });
}


export {
    signup,
    signin,
    getUser,
    updateUser,
    deleteUser,
    updatePassword,
    resetPassword,
    forgetPassword,
    getAllAccounts,
    GetProfileDataForAnotherUser,
};
