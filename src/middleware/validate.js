import appError from "../utils/appError.js";

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(
            // req.body
            { ...req.body, ...req.query, ...req.params }
            , { abortEarly: false });
        if (error) {
            const errorArray = error?.details?.map(err => err.message = err.message.replace(/['"]+/g, ''));
            return next(new appError(errorArray, 400));
        }
        next();
    }
}

export default validate