import jwt from 'jsonwebtoken';
import appError from '../../utils/appError.js';
const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.token, "LoginjwtPrivateKey", async (err, authData) => {
        if (err) {
            return next(new appError(err?.message, 401))
        }
        req.user = authData
        next()
    })
}

export default verifyToken