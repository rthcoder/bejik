import { Router } from 'express';
import clientSide from "../controllers/client.controller.js";

const router = Router();

router.get('/api/v1/client/:id', clientSide.GET);

export default router;