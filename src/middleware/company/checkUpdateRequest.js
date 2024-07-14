import Company from "../../database/model/companyCollection/company.model.js"
import appError from "../../utils/appError.js"

const checkUpdateUser = async (req, res, next) => {
    const company = await Company.findOne({ companyHr: req.body.companyHr })
    if(!company)return next(new appError("company Not Exist",409))
        next()
}
export {
    checkUpdateUser
}