import { Router } from 'express';
import uploadFiles from "../services/multer.js";
import user from "../controllers/user.controller.js";
import multerHandler from "../middlewares/multer.middleware.js";
import validation from "../middlewares/validation.middleware.js";

const router = Router();

router.get('/api/v1/users', user.GET);
router.get('/api/v1/users/:id', user.GET);
router.post('/api/v1/users', uploadFiles, multerHandler, validation, user.POST);
router.put('/api/v1/users/:id', user.PUT);
router.delete('/api/v1/users/:id', user.DELETE);

export default router;