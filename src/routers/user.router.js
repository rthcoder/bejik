import { Router } from 'express';
import user from "../controllers/user.controller.js";

const router = Router();

router.get('/api/v1/users', user.GET);
router.get('/api/v1/users/:id', user.GET);
router.post('/api/v1/users', user.POST);

export default router;