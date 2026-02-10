import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';


export default async function authenticate(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: false,
                message: 'Missing or malformed token.'
            });
        }
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await Admin.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Token user not found.'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Invalid / expired token.'
        });
    }
}