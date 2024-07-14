import { model, Schema, Types } from "mongoose";

// schema for application collection
const schema = Schema({
    jobId: {
        type: Types.ObjectId,
        ref: "Job",
    },
    userId: {
        type: Types.ObjectId,
        ref: "User",
    },
    userTechSkills: [String],
    userSoftSkills: [String],
    userResume: {
        type: String,
        required: true
    }
})

// model for application collection
const Application = model("Application", schema);

// exporting model
export default Application