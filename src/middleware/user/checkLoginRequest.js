import User from "../../database/model/userCollection/user.model.js"
import appError from './../../utils/appError.js';
import bcrypt,{ compareSync } from 'bcrypt';

// check login request
const checkLoginRequest = async (req, res, next) => {
    const user = await User.findOne(
        {
            $or: [
                { email: req.body.email },
                { recoveryEmail: req.body.recoveryEmail },
                { mobile: req.body.mobile },
            ]
        }
    )
    if (!user) return next(new appError("Invalid credentials", 401))
    const match = bcrypt.compareSync(req?.body?.password, user?.password)
    if (!match) return next(new appError("Invalid credentials", 401))
    next()
}

// export middlewares
export {
    checkLoginRequest
}