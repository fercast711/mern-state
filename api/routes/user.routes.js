import {Router} from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = Router();

router.get('/test', test)
router.patch('/update/:id', verifyToken, updateUser)

export default router;