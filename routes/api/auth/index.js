import { Router } from 'express';
import {
    registration, login, logout
} from '../../../controllers/auth';

// import {
//     validateCreate,
//     validateUpdate,
//     validateId,
//     validateUpdateFavorite,
// } from './validation.js';

const router = new Router();

router.post('/signup', registration);
router.post('/login', login);
router.post('/logout', logout);


export default router;