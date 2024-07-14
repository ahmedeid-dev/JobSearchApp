import Job from "../../database/model/jobCollection/job.model.js"
import appError from "../../utils/appError.js"

const checkExistJob = async (req, res, next) => {
    const job = await Job.findById(req.params.id)
    if (!job) return next(new appError("Job not found", 404))
    next()
}
export {
    checkExistJob
}