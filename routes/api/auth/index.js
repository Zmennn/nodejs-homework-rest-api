import { Router } from 'express';

import guard from '../../../middlewares/guard';
import { upload } from '../../../middlewares/upload';
import {
    registration, login, logout, current, uploadAvatar, verification,
    repeatVerificationEmail,
} from '../../../controllers/auth';

import {
    validateSignup, validateResendVerifySchema
} from './validation.js';

const router = new Router();

router.post('/signup', validateSignup, registration);
router.post('/login', validateSignup, login);
router.post('/logout', guard, logout);
router.get('/current', guard, current);
router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar);

router.get('/verify/:verificationToken', verification);
router.post('/verify', validateResendVerifySchema, repeatVerificationEmail);

export default router;