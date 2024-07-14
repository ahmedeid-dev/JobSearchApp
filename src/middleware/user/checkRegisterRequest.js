import User from "../../database/model/userCollection/user.model.js"
import appError from './../../utils/appError.js';
import bcrypt from 'bcrypt';

// check register email request
const checkRegisterEmail = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return next(new appError("Email already exists", 409))
    }
    next()
}

// check register mobile request
const checkRegisterMobile = async (req, res, next) => {
    const { mobile } = req.body
    const user = await User.findOne({ mobile })
    if (user) { return next(new appError("Mobile already exists", 409)) }
    next()
}

// hashing password
const hashingPassword = async (req, res, next) => {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    next()
}

// export middlewares
export {
    checkRegisterEmail,
    checkRegisterMobile,
    hashingPassword
}