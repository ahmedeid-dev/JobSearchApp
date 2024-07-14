import { model, Schema, Types, version } from "mongoose";

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

const Company = model("Company", schema);
export default Company;