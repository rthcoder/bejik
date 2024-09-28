import { Router } from 'express';
import uploadFiles from "../services/multer.js";
import company from "../controllers/company.controller.js";
import validation from '../middlewares/validation.middleware.js';
import multerHandler from "../middlewares/multer.middleware.js";



const router = Router();

router.get('/api/v1/company', company.GET);
router.get('/api/v1/company/:id', company.GET);
router.post('/api/v1/company', validation, uploadFiles, multerHandler, company.POST);
router.put('/api/v1/company/:id', uploadFiles, multerHandler, company.PUT);
router.delete('/api/v1/company/:id', company.DELETE);

export default router;