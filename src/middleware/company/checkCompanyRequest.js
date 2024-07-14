import Company from "../../database/model/companyCollection/company.model.js";
import appError from './../../utils/appError.js';

const checkHrStatus = async (req, res, next) => {
    if (req.user.role !== "Company_HR") return next(new appError("Only HR can perform this action", 401));
    req.body.companyHR = req.user.id
    next();
}
const checkCompanyName = async (req, res, next) => {
    const company = await Company.findOne({ name: req.body.name });
    if (company) return next(new appError("Company name already exists", 409));
    next();
}
const checkCompanyEmail = async (req, res, next) => {
    const company = await Company.findOne({ email: req.body.email });
    if (company) return next(new appError("Company email already exists", 409));
    next();
}
const checkUserStatus = async (req, res, next) => {
    if (req.user.role !== "user") return next(new appError("Only user can perform this action", 401));
    next();
}
export {
    checkHrStatus,
    checkUserStatus,
    checkCompanyName,
    checkCompanyEmail,
}