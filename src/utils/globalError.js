import appError from './appError.js';

function catchError(callback) {
    return (req, res, next) => {
        callback(req, res, next)
            .catch(err => next(new appError(err.message, err.statusCode)))
    }
}

export default catchError