import { checkUpdateUser } from '../../middleware/company/checkUpdateRequest.js';
import verifyToken from './../../middleware/user/verifyToken.js';
import { addCompanyValidation, updateCompanyValidation } from './company.vaildation.js';
import validate from './../../middleware/validate.js';
import catchError from "../../utils/globalError.js";
import { Router } from "express";
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
import { checkDeleteCompany } from '../../middleware/company/checkDeleteRequest.js';

const companyRouter = Router();

companyRouter.use(verifyToken).use(checkHrStatus);

companyRouter.route("/")
.post(validate(addCompanyValidation), checkCompanyName, checkCompanyEmail, catchError(addCompany))
.patch(validate(updateCompanyValidation), checkUpdateUser, checkCompanyName, checkCompanyEmail, catchError(updateCompany))
.delete(checkDeleteCompany, catchError(deleteCompany))

companyRouter.route("/:id")
.get(catchError(getCompany))

companyRouter.route("/all/:id").get(catchError(getAllApplications))

companyRouter.route("/search").post(catchError(getCompanyByName))

export default companyRouter;