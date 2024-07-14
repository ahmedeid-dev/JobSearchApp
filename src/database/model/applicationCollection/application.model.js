import { model, Schema, Types } from "mongoose";

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

const Application = model("Application", schema);
export default Application