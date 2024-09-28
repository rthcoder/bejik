import { Router } from 'express';
import uploadFiles from "../services/multer.js";
import company from "../controllers/company.controller.js";
import checkRole from "../middlewares/checkRole.middleware.js";
import multerHandler from "../middlewares/multer.middleware.js";
import validation from '../middlewares/validation.middleware.js';
import checkToken from "../middlewares/checkToken.middleware.js";



const router = Router();

router.get('/api/v1/company', checkToken, checkRole, company.GET);
router.get('/api/v1/company/:id', checkToken, checkRole, company.GET);
router.post('/api/v1/company', validation, checkToken, checkRole, uploadFiles, multerHandler, company.POST);
router.put('/api/v1/company/:id', checkToken, checkRole, uploadFiles, multerHandler, company.PUT);
router.delete('/api/v1/company/:id', checkToken, checkRole, company.DELETE);

export default router;