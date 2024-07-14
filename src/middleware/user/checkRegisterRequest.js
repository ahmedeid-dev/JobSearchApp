import User from "../../database/model/userCollection/user.model.js"
import appError from './../../utils/appError.js';
import bcrypt from 'bcrypt';

const checkRegisterEmail = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return next(new appError("Email already exists", 409))
    }
    next()
}
const checkRegisterMobile = async (req, res, next) => {
    const { mobile } = req.body
    const user = await User.findOne({ mobile })
    if (user) { return next(new appError("Mobile already exists", 409)) }
    next()
}
const hashingPassword = async (req, res, next) => {
    req.body.password = await bcrypt.hashSync(req.body.password, 10);
    next()
}

export {
    checkRegisterEmail,
    checkRegisterMobile,
    hashingPassword
}