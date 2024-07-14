import joi from 'joi';

// add job validation schema
const addJobValidation = joi.object({
    title: joi
        .string()
        .required()
        .messages({
            "string.empty": "Title is required",
        }),

    location: joi
        .string()
        .required()
        .messages({
            "string.empty": "Location is required",
        }),

    workingTime: joi
        .string()
        .required()
        .messages({
            "string.empty": "Working time is required",
        }),

    seniorityLevel: joi
        .string()
        .required()
        .messages({
            "string.empty": "Seniority level is required",
        }),

    description: joi
        .string()
        .required()
        .messages({
            "string.empty": "Description is required",
        }),

    technicalSkills: joi
        .array()
        .required()
        .messages({
            "string.empty": "Technical skills is required",
        }),

    softSkills: joi
        .array()
        .required()
        .messages({
            "string.empty": "Soft skills is required",
        }),

    addedBy: joi
        .string()
        .hex()
        .required()
        .messages({
            "string.empty": "Added by is required",
        })
})

// update job validation schema
const updateJobValidation = joi.object({
    title: joi
        .string()
        .messages({
            "string.empty": "Title is required",
        }),

    location: joi
        .string()
        .messages({
            "string.empty": "Location is required",
        }),

    workingTime: joi
        .string()
        .messages({
            "string.empty": "Working time is required",
        }),

    seniorityLevel: joi
        .string()
        .messages({
            "string.empty": "Seniority level is required",
        }),

    description: joi
        .string()
        .messages({
            "string.empty": "Description is required",
        }),

    technicalSkills: joi
        .array()
        .messages({
            "string.empty": "Technical skills is required",
        }),

    softSkills: joi
        .array()
        .messages({
            "string.empty": "Soft skills is required",
        }),

    addedBy: joi
        .string()
        .hex()
        .messages({
            "string.empty": "Added by is required",
        }),

    id: joi
        .string()
        .hex()
        .messages({
            "string.empty": "Id is required",
        })
})

// export job validation schemas
export {
    addJobValidation,
    updateJobValidation
}