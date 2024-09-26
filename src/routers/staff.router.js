import { Router } from 'express';
import staff from "../controllers/staff.controller.js";

const router = Router();

router.get('/api/v1/staffs', staff.GET);
router.get('/api/v1/staffs/:id', staff.GET);
router.post('/api/v1/staffs', staff.POST);
router.put('/api/v1/staffs/:id', staff.PUT);
router.delete('/api/v1/staffs/:id', staff.DELETE);

export default router;