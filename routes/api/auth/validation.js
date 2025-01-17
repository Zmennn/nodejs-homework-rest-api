import Joi from 'joi';
import pkg from 'mongoose';
import { HttpCode } from '../../../lib/constants.js';

const { Types } = pkg;

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(30).required(),
});

const resendVerifySchema = Joi.object({
    email: Joi.string().email().required(),
});

export const validateSignup = async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body);
    } catch (err) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json({ message: `Field ${err.message.replace(/"/g, '')}` });
    }
    next();
};

export const validateResendVerifySchema = async (req, res, next) => {
    try {
        await resendVerifySchema.validateAsync(req.body);
    } catch (error) {
        return res
            .status(HttpCode.BAD_REQUEST)
            .json({ message: 'missing required field email' });
    }
    next();
};