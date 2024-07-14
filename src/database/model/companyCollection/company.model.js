import { model, Schema, Types, version } from "mongoose";

// schema for company collection
const schema = Schema({
    companyName: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    industry: String,
    address: String,
    numberOfEmployees: {
        type: Number,
        min: 11,
        max: 20,
    },
    companyEmail: {
        type: String,
        unique: true,
    },
    companyHR: {
        type: Types.ObjectId,
        ref: "User",
    }
},
    {
    versionKey: false
})

// model for company collection
const Company = model("Company", schema);

// exporting model
export default Company;