import joi from 'joi';

// user signup validation schema
const userSignupValidation = joi.object({
    firstName: joi
        .string()
        .messages({
            "string.empty": "First name is required",
        }),

    lastName: joi
        .string()
        .messages({
            "string.empty": "Last name is required",
        }),

    email: joi
        .string()
        .email()
        .lowercase()
        .trim()
        .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .messages({
            "string.empty": "Email is required",
            "string.base": "Email must be a string",
            "string.pattern.base": "Email is invalid",
            "string.email": "Email is invalid",
        }),

    password: joi
        .string()
        .min(8)
        .max(20)
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 20 characters",
            "string.empty": "Password is required",
        }),

    recoveryEmail: joi
        .string()
        .email()
        .messages({
            "string.empty": "Recovery email is required",
            "string.email": "Recovery email is invalid",
        }),

    DOB: joi
        .string()
        .messages({
            "string.empty": "Date of birth is required",
        }),

    mobile: joi
        .string()
        .length(11)
        .pattern(/^01[0125][0-9]{8}$/)
        .messages({
            "string.empty": "Mobile is required",
        }),

    role: joi
        .string()
        .messages({
            "string.empty": "Role is required",
        })
})

// user login validation schema
const userLoginValidation = joi.object({

    email: joi
        .string()
        .email()
        .lowercase()
        .trim()
        .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .messages({
            "string.base": "Email must be a string",
            "string.pattern.base": "Email is invalid",
            "string.email": "Email is invalid",
        }),

    password: joi
        .string()
        .min(8)
        .max(20)
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 20 characters",
            "string.empty": "Password is required",
        }),
})

// user update validation schema
const userUpdateValidation = joi.object({
    id: joi
        .string()
        .hex()
        .messages({
            "string.base": "Id must be a string",
            "string.hex": "Id must be a hex string",
            "string.empty": "Id is required",
        }),

    firstName: joi
        .string()
        .messages({
            "string.base": "First name must be a string",
        }),

    lastName: joi
        .string()
        .messages({
            "string.base": "Last name must be a string",
        }),

    email: joi
        .string()
        .email()
        .lowercase()
        .trim()
        .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        .messages({
            "string.base": "Email must be a string",
            "string.pattern.base": "Email is invalid",
            "string.email": "Email is invalid",
        }),

    recoveryEmail: joi
        .string()
        .email()
        .messages({
            "string.email": "Recovery email is invalid",
        }),

    DOB: joi
        .string()
        .messages({
            "string.base": "Date of birth must be a Date",
        }),

    mobile: joi
        .string()
        .length(11)
        .pattern(/^(010|011|012|015)[0-9]{8}$/)
        .messages({
            "string.base": "Mobile must be a string",
            "string.pattern.base": "Mobile is invalid",
            "string.length": "Mobile must be 11 characters"
        }),

    role: joi
        .string()
        .messages({
            "string.base": "Role must be a string",
        })
})

// user id validation schema
const userIdValidation = joi.object({
    id: joi
        .string()
        .hex()
        .messages({
            "string.base": "Id must be a string",
            "string.hex": "Id must be a hex string",
            "string.empty": "Id is required",
        }),
})

// user recovery email validation schema
const userRecoveryEmailValidation = joi.object({
    recoveryEmail
        : joi
            .string()
            .email()
            .lowercase()
            .trim()
            .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .messages({
                "string.base": "Recovery email must be a string",
                "string.pattern.base": "Recovery email is invalid",
                "string.email": "Recovery email is invalid",
            }),
})

// user password validation schema
const userPasswordValidation = joi.object({
    password: joi
        .string()
        .min(8)
        .max(20)
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 20 characters",
            "string.empty": "Password is required",
        }),
})

// user forget password validation schema
const forgetPasswordSchema = joi.object({
    email: joi.string().email(),
    mobile: joi
        .string()
        .length(11)
        .pattern(/^(010|011|012|015)[0-9]{8}$/)
        .messages({
            "string.base": "Mobile must be a string",
            "string.pattern.base": "Mobile is invalid",
            "string.length": "Mobile must be 11 characters"
        }),
    recoveryEmail
        : joi
            .string()
            .email()
            .lowercase()
            .trim()
            .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .messages({
                "string.base": "Recovery email must be a string",
                "string.pattern.base": "Recovery email is invalid",
                "string.email": "Recovery email is invalid",
            }),
})

// user reset password validation schema
const resetPasswordSchema = joi.object({
    newPassword: joi
        .string()
        .min(8)
        .max(20)
        .messages({
            "string.base": "Password must be a string",
            "string.min": "Password must be at least 8 characters",
            "string.max": "Password must be at most 20 characters",
            "string.empty": "Password is required",
        }),
    otp: joi.string().messages({
        "string.base": "OTP must be a string",
    }),
    email: joi.string()
        .email()
        .messages({
            "string.base": "Email must be a string",
            "string.pattern.base": "Email is invalid",
            "string.email": "Email is invalid",
        }),
})

// exporting user validation schemas
export {
    userIdValidation,
    userLoginValidation,
    resetPasswordSchema,
    forgetPasswordSchema,
    userUpdateValidation,
    userSignupValidation,
    userPasswordValidation,
    userRecoveryEmailValidation,
}