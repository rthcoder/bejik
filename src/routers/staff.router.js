import { Router } from 'express';
import staff from "../controllers/staff.controller.js";
import checkRole from "../middlewares/checkRole.middleware.js";
import validation from '../middlewares/validation.middleware.js';
import checkToken from "../middlewares/checkToken.middleware.js";


const router = Router();

router.get('/api/v1/staffs', checkToken, checkRole, staff.GET);
router.get('/api/v1/staffs/:id', checkToken, checkRole, staff.GET);
router.post('/api/v1/staffs', checkToken, checkRole, validation, staff.POST);
router.put('/api/v1/staffs/:id', checkToken, checkRole, staff.PUT);
router.delete('/api/v1/staffs/:id', checkToken, checkRole, staff.DELETE);

export default router;