import Application from '../../database/model/applicationCollection/application.model.js';
import Company from './../../database/model/companyCollection/company.model.js';
import Job from '../../database/model/jobCollection/job.model.js';
import appError from '../../utils/appError.js';

//  add company controller
const addCompany = async (req, res, next) => {
    const company = await Company.insertMany(req.body)
    res.status(201).json({ message: "Company created successfully", company })
}

//  update company controller
const updateCompany = async (req, res, next) => {
    const company = await Company.findOneAndUpdate
        ({ companyHr: req.body.companyHr }, req.body, { new: true })
    res.status(200).json({ message: "Company updated successfully", company })
}

//  delete company controller
const deleteCompany = async (req, res, next) => {
    const company = await Company.findOneAndDelete({ companyHr: req.body.companyHr })
    res.status(200).json({ message: "Company deleted successfully", company })
}

//  get company controller
const getCompany = async (req, res, next) => {
    const company = await Company.findById(req.params.id)
    const jobs = await Job.find({ addedBy: company._id });
    const result = { ...company._doc, jobs }
    res.status(200).json({ message: "Company fetched successfully", result })
}

//  get company controller
const getCompanyByName = async (req, res, next) => {
    const company = await Company.findOne({ companyName: req.query.companyName })
        .populate("companyHR", "-password -expiredOTP")
    res.status(200).json({ message: "Company fetched successfully", company })
}

//  get all applications
const getAllApplications = async (req, res, next) => {
    // destructure job id from params
    const { jobId } = req.params

    // check if job exists and return error if it does not
    const job = await Job.findById(jobId)
    if (!job) return next(new appError("job not found", 404))

    const applications = await Application.find({ jobId }).populate("user")
    res.status(200).json({ count: applications.length, applications });
}

//  export modules
export {
    getAllApplications,
    getCompanyByName,
    updateCompany,
    deleteCompany,
    addCompany,
    getCompany,
}