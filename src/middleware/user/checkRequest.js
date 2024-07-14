import User from "../../database/model/userCollection/user.model.js";
import appError from "../../utils/appError.js";

// check request by recovery email
const checkRequestByRecoveryEmail = async (req, res, next) => {
    const users = await User.find({ recoveryEmail: req.query.recoveryEmail });
    if (users.length == 0) return next(new appError("User not found", 404));
    next();
}

// export middlewares
export {
    checkRequestByRecoveryEmail
}