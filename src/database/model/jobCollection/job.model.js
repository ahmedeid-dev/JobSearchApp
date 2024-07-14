import { model, Schema, Types } from "mongoose";

const schema = Schema({
    jobTitle: {
        type: String,
    },
    jobLocation: {
        type: String,
        enum: ["remotely", "onsite", "hybrid"],
    },
    workingTime: {
        type: String,
        enum: ["full-time", "part-time"],
    },
    seniorityLevel: {
        type: String,
        enum: ["junior", "mid-level", "senior", "team-lead", "cto"]
    },
    jobDescription: {
        type: String,
    },
    technicalSkills: [String],
    softSkills: [String],
    addedBy: {
        type: Types.ObjectId,
        ref: "Company",
    }
})

const Job = model("Job", schema);
export default Job;