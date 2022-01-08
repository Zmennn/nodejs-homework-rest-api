import { Router } from 'express';

import guard from '../../../middlewares/guard';
import {
    registration, login, logout, current
} from '../../../controllers/auth';

import {
    validateSignup
} from './validation.js';

const router = new Router();

router.post('/signup', validateSignup, registration);
router.post('/login', validateSignup, login);
router.post('/logout', guard, logout);
router.get('/current', guard, current)

export default router;