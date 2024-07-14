import { checkRequestByRecoveryEmail } from "../../middleware/user/checkRequest.js";
import { checkLoginRequest } from "../../middleware/user/checkLoginRequest.js";
import { checkUserStatus } from "../../middleware/user/checkDeleteRequest.js";
import verifyToken from "../../middleware/user/verifyToken.js";
import validate from './../../middleware/validate.js';
import catchError from "../../utils/globalError.js";
import { Router } from "express";
import {
    checkRegisterEmail,
    checkRegisterMobile,
    hashingPassword,
} from "../../middleware/user/checkRegisterRequest.js";
import {
    checkForgetRequest,
    checkUpdateCredintials,
    checkUpdateEmailAndMobile,
    checkUpdatePassword,
    checkUpdateRequest,
} from "./../../middleware/user/checkUpdateRequest.js";
import {
    signup,
    signin,
    updateUser,
    deleteUser,
    getUser,
    updatePassword,
    forgetPassword,
    getAllAccounts,
    GetProfileDataForAnotherUser,
    resetPassword,
} from "./user.controller.js";
import {
    userIdValidation,
    userLoginValidation,
    userSignupValidation,
    userUpdateValidation,
    userRecoveryEmailValidation,
    userPasswordValidation,
    resetPasswordSchema,
    forgetPasswordSchema,
} from "./user.vaildation.js";

// user routes here
const userRouter = Router();

// user signup route
userRouter.post("/signup", validate(userSignupValidation), checkRegisterEmail, checkRegisterMobile, hashingPassword, catchError(signup));

// user login route
userRouter.post("/signin", validate(userLoginValidation), checkLoginRequest, catchError(signin));


userRouter
    .route("/")
    // user update route
    .put(verifyToken, validate(userUpdateValidation), checkUserStatus, checkUpdateRequest, checkUpdateEmailAndMobile, checkUpdateCredintials, catchError(updateUser))
    // user delete route
    .delete(verifyToken, validate(userIdValidation), checkUserStatus, catchError(deleteUser))
    // user get route
    .get(verifyToken, validate(userIdValidation), checkUserStatus, catchError(getUser));

userRouter.route("/anotherUser")
    // user get route for another user
    .get(validate(userIdValidation), catchError(GetProfileDataForAnotherUser));

// user update password route
userRouter.patch("/updatePassword", validate(userPasswordValidation), verifyToken, checkUpdatePassword, hashingPassword, catchError(updatePassword));

// user forget password route
userRouter.post("/forgetPassword", validate(forgetPasswordSchema), verifyToken, checkForgetRequest, catchError(forgetPassword));

// user reset password route
userRouter.post("/resetPassword", validate(resetPasswordSchema), verifyToken, checkForgetRequest, catchError(resetPassword));

// user get all route for recovery email
userRouter.get("/all", validate(userRecoveryEmailValidation), checkRequestByRecoveryEmail, catchError(getAllAccounts));

// export user routes
export default userRouter;
