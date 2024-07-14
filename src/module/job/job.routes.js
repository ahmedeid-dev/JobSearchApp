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

const jobRouter = Router();
jobRouter.use(verifyToken)

jobRouter.route("/")
    .post(validate(addJobValidation), checkHrStatus, catchError(addJob))

jobRouter.route("/all/:id").get(catchError(getAllJobs))

jobRouter.route("/:id")
    .patch(validate(updateJobValidation), checkHrStatus, checkExistJob, catchError(updateJob))
    .delete(checkHrStatus, checkExistJob, catchError(deleteJob))
    .get(checkHrStatus, catchError(getJob))

jobRouter.route("/search").get(catchError(searchJobs))

jobRouter.route("/apply").post(checkUserStatus, catchError(applyForJob))

export default jobRouter;