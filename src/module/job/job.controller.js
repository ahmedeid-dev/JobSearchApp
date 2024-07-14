
import Company from '../../database/model/companyCollection/company.model.js';
import Job from './../../database/model/jobCollection/job.model.js';
const addJob = async (req, res, next) => {
    const job = await Job.insertMany(req.body)
    res.status(201).json({ message: "Job created successfully", job })
}

const updateJob = async (req, res, next) => {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: "Job updated successfully", job })
}

const deleteJob = async (req, res, next) => {
    const job = await Job.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Job deleted successfully", job })
}

const getAllJobs = async (req, res, next) => {
    const jobs = await Job.find({ addedBy: req.params.id })
        .populate("addedBy")
    res.status(200).json({ message: "Jobs fetched successfully", jobs })
}

const getJob = async (req, res, next) => {
    const company = await Company.find({ companyName: req.params.id })
    const jobs = await Job.find({ addedBy: company[0]._id })
        .populate("addedBy")
    res.status(200).json({ message: "Job fetched successfully", jobs })
}

const searchJobs = async (req, res, next) => {
    const jobs = await Job.find({
        $or:
            [{ workingTime: req.body.workingTime },
            { location: req.body.location },
            { seniorityLevel: req.body.seniorityLevel },
            { title: req.body.title },
            { technicalSkills: req.body.technicalSkills },
            ]
    })
    res.status(200).json({ message: "Jobs fetched successfully", jobs })
}

const applyForJob = async (req, res, next) => {
    const job = await Job.insetMany(req.body)
    res.status(201).json({ message: "Job applied successfully", job })
}

export {
    getJob,
    addJob,
    updateJob,
    deleteJob,
    getAllJobs,
    searchJobs,
    applyForJob
}