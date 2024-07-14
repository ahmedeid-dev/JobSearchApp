import Company from "../../database/model/companyCollection/company.model.js";
import appError from "../../utils/appError.js";

// check delete company middleware
const checkDeleteCompany = async (req, res, next) => {
    const company = await Company.findOne({ companyHr: req.body.companyHr });
    if (!company) return next(new appError("Company Not Found", 404));
    next();
}

// export middlewares
export { checkDeleteCompany }