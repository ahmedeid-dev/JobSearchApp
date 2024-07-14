import { checkDeleteCompany } from '../../middleware/company/checkDeleteRequest.js';
import { checkUpdateUser } from '../../middleware/company/checkUpdateRequest.js';
import verifyToken from './../../middleware/user/verifyToken.js';
import validate from './../../middleware/validate.js';
import catchError from "../../utils/globalError.js";
import { Router } from "express";
import {
    addCompanyValidation,
    updateCompanyValidation
} from './company.vaildation.js';
import {
    checkCompanyEmail,
    checkCompanyName,
    checkHrStatus
} from "../../middleware/company/checkCompanyRequest.js";
import {
    addCompany,
    getAllApplications,
    updateCompany,
    deleteCompany,
    getCompany,
    getCompanyByName
} from "./company.controller.js";

// company routes here
const companyRouter = Router();

// verify token middleware
companyRouter.use(verifyToken).use(checkHrStatus);

companyRouter.route("/")
    // add company route
    .post(validate(addCompanyValidation), checkCompanyName, checkCompanyEmail, catchError(addCompany))
    // update company route
    .patch(validate(updateCompanyValidation), checkUpdateUser, checkCompanyName, checkCompanyEmail, catchError(updateCompany))
    // delete company route
.delete(checkDeleteCompany, catchError(deleteCompany))

// get company route
companyRouter.route("/:id")
.get(catchError(getCompany))

// get all applications route
companyRouter.route("/all/:id").get(catchError(getAllApplications))

// search company route
companyRouter.route("/search").post(catchError(getCompanyByName))


// export company router
export default companyRouter;