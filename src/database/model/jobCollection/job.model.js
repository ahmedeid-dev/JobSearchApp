import { model, Schema, Types } from "mongoose";

// schema for job collection
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

// model for job collection
const Job = model("Job", schema);

// exporting model
export default Job;