import User from "../../database/model/userCollection/user.model.js";
import appError from "../../utils/appError.js";

const checkUserStatus = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user?.status == "offline") return next(new appError("User Not Found ", 409));
    next();
}
export {
    checkUserStatus
}