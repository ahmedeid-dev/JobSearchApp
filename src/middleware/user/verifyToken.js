import appError from '../../utils/appError.js';
import jwt from 'jsonwebtoken';

// verify token middleware
const verifyToken = (req, res, next) => {
    jwt.verify(req.headers.token, "LoginjwtPrivateKey", async (err, authData) => {
        if (err) return next(new appError(err?.message, 401))
        req.user = authData
        next()
    })
}

// export middlewares
export default verifyToken