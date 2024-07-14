import joi from "joi"

// add company validation schema
const addCompanyValidation = joi.object({
    companyName: joi
        .string()
        .required()
        .messages({
            "string.empty": "companyName is required",
        }),
    description: joi
        .string()
        .required()
        .messages({
            "string.empty": "Description is required",
        }),
    industry: joi
        .string()
        .required()
        .messages({
            "string.empty": "industry is required",
        }),
    address: joi
        .string()
        .required()
        .messages({
            "string.empty": "address is required",
        }),
    numberOfEmployees: joi
        .number()
        .min(11)
        .max(20)
        .required()
        .messages({
            "string.empty": "numberOfEmployees is required"
        }),
    companyEmail: joi
        .string()
        .email()
        .required()
        .messages({
            "string.empty": "companyEmail is required",
            "string.email": "companyEmail is invalid",
        }),

    companyHR: joi
        .string()
        .hex()
        .required()
        .messages({
            "string.empty": "HR is required",
        }),


})

// update company validation schema
const updateCompanyValidation = joi.object({
    companyName: joi
        .string()
        .messages({
            "string.empty": "companyName is required",
        }),
    description: joi
        .string()
        .messages({
            "string.empty": "Description is required",
        }),
    industry: joi
        .string()
        .messages({
            "string.empty": "industry is required",
        }),
    address: joi
        .string()
        .messages({
            "string.empty": "address is required",
        }),
    numberOfEmployees: joi
        .number()
        .min(11)
        .max(20)
        .messages({
            "string.empty": "numberOfEmployees is required"
        }),
    companyEmail: joi
        .string()
        .email()
        .messages({
            "string.empty": "companyEmail is required",
            "string.email": "companyEmail is invalid",
        }),

    companyHR: joi
        .string()
        .hex()
        .messages({
            "string.empty": "HR is required",
        }),


})

// export company validation schemas
export {
    addCompanyValidation,
    updateCompanyValidation
}