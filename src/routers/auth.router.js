import { Router } from 'express';
import auth from "../controllers/auth.controller.js";
import checkToken from '../middlewares/checkToken.middleware.js'

const router = Router();

router.post('/api/v1/auth/login', auth.LOGIN);
router.get('/api/v1/me', checkToken, auth.ME);

export default router;