import { Router } from 'express';
import uploadFiles from "../services/multer.js";
import user from "../controllers/user.controller.js";
import checkRole from "../middlewares/checkRole.middleware.js";
import multerHandler from "../middlewares/multer.middleware.js";
import validation from "../middlewares/validation.middleware.js";
import checkToken from "../middlewares/checkToken.middleware.js";


const router = Router();

router.get('/api/v1/users', checkToken, checkRole, user.GET);
router.get('/api/v1/users/:id', checkToken, checkRole, user.GET);
router.post('/api/v1/users', checkToken, checkRole, validation, uploadFiles, multerHandler, user.POST);
router.put('/api/v1/users/:id', checkToken, checkRole, uploadFiles, multerHandler, user.PUT);
router.delete('/api/v1/users/:id', checkToken, checkRole, user.DELETE);

export default router;