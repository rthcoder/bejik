import { Router } from 'express';
import auth from "../controllers/auth.controller.js";

const router = Router();

router.post('/api/v1/auth/login', auth.LOGIN);
router.get('/api/v1/me', auth.ME);

export default router;