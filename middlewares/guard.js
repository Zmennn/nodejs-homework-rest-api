import jwt from 'jsonwebtoken';

import Users from '../repository/users';
import { HttpCode } from '../lib/constants'

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, SECRET_KEY);
        return !!verify
    } catch (err) {
        return false
    }
};

const guard = async (req, res, next) => {
    const token = req.get('authorization')?.split(" ")[1];
    const isValidToken = verifyToken(token);
    if (!isValidToken) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ message: "Not authorized" });
    }

    next()
};

export default guard;