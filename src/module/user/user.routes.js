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
import { checkRequestByRecoveryEmail } from "../../middleware/user/checkRequest.js";

const userRouter = Router();

userRouter.post("/signup", validate(userSignupValidation), checkRegisterEmail, checkRegisterMobile, hashingPassword, catchError(signup));

userRouter.post("/signin", validate(userLoginValidation), checkLoginRequest, catchError(signin));


userRouter
    .route("/")
    .put(verifyToken, validate(userUpdateValidation), checkUserStatus, checkUpdateRequest, checkUpdateEmailAndMobile, checkUpdateCredintials, catchError(updateUser))
    .delete(verifyToken, validate(userIdValidation), checkUserStatus, catchError(deleteUser))
    .get(verifyToken, validate(userIdValidation), checkUserStatus, catchError(getUser));

userRouter.route("/anotherUser")
    .get(validate(userIdValidation), catchError(GetProfileDataForAnotherUser));

userRouter.patch("/updatePassword", validate(userPasswordValidation), verifyToken, checkUpdatePassword, hashingPassword, catchError(updatePassword));

userRouter.post("/forgetPassword", validate(forgetPasswordSchema), verifyToken, checkForgetRequest, catchError(forgetPassword));

userRouter.post("/resetPassword", validate(resetPasswordSchema), verifyToken, checkForgetRequest, catchError(resetPassword));



userRouter.get("/all", validate(userRecoveryEmailValidation), checkRequestByRecoveryEmail, catchError(getAllAccounts));

export default userRouter;
