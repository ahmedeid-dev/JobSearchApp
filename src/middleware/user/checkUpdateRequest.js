import User from "../../database/model/userCollection/user.model.js";
import appError from './../../utils/appError.js';

// check update request
const checkUpdateRequest = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return next(new appError("User not found", 404));
    next();
}

// check update email and mobile
const checkUpdateEmailAndMobile = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (user.email == req.body.email) return next(new appError("Email already exists", 409));
    if (user.mobile == req.body.mobile) return next(new appError("mobile already exists", 409));
    next();
}

// check update credintials
const checkUpdateCredintials = async (req, res, next) => {
    if (req.body.password) return next(new appError("Password cannot be changed here ", 401));
    if (req.body.status) return next(new appError("Status cannot be changed here ", 401));
    next();
}

// check update password
const checkUpdatePassword = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user) return next(new appError("User not found", 404));
    if (!req.body.password) return next(new appError("Password only can be changed", 401));
    if (user.password == req.body.password) return next(new appError("password matches with old password or already changed", 409));
    next();
}

// check forget request
const checkForgetRequest = async (req, res, next) => {
    const user = await User.findOne(
        {
            $or: [
                { email: req.body.email },
                { recoveryEmail: req.body.recoveryEmail },
                { mobile: req.body.mobile },
            ]
        },
    )
    if (!user) return next(new appError("Invalid credentials", 401))
    next()
}

// export middlewares
export {
    checkUpdateRequest,
    checkUpdateEmailAndMobile,
    checkUpdatePassword,
    checkUpdateCredintials,
    checkForgetRequest
}