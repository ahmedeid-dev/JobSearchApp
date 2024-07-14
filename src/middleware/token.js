// import { verify } from 'jsonwebtoken';

// function authenticateToken(req, res, next) {
//     const token = req.header('Authorization');
//     if (!token) return res.status(401).send('Access denied');
//     const key = process.env.ACCESS_TOKEN_SECRET;
//     const secret = process.env.REFRESH_TOKEN_SECRET;
//     const payload = verify(token, secret);
//     const secretKey = 'jwt_secret_Key_Is_Here';
//     try {
//         const verified = verify(token, secretKey);
//         req.user = verified;
//         next();
//     } catch (error) {
//         res.status(400).send('Invalid token');
//     }
// }

// export default authenticateToken;
