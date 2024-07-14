import { checkExistJob } from '../../middleware/job/checkJobRequest.js';
import verifyToken from './../../middleware/user/verifyToken.js';
import validate from './../../middleware/validate.js';
import catchError from "../../utils/globalError.js";
import { Router } from "express";
import {
    addJobValidation,
    updateJobValidation
} from "./job.vaildation.js";
import {
    checkHrStatus,
    checkUserStatus
} from "../../middleware/company/checkCompanyRequest.js";
import {
    addJob,
    getAllJobs,
    updateJob,
    deleteJob,
    getJob,
    searchJobs,
    applyForJob,
} from "./job.controller.js";

// job routes here
const jobRouter = Router();

// verify token middleware
jobRouter.use(verifyToken)

// job add route
jobRouter.route("/")
    .post(validate(addJobValidation), checkHrStatus, catchError(addJob))

    // get all jobs route
jobRouter.route("/all/:id").get(catchError(getAllJobs))

jobRouter.route("/:id")
    // update job route
    .patch(validate(updateJobValidation), checkHrStatus, checkExistJob, catchError(updateJob))
    // delete job route
    .delete(checkHrStatus, checkExistJob, catchError(deleteJob))
    // get job route
    .get(checkHrStatus, catchError(getJob))

    // search job route
jobRouter.route("/search").get(catchError(searchJobs))

// apply for job
jobRouter.route("/apply").post(checkUserStatus, catchError(applyForJob))

// export job router
export default jobRouter;