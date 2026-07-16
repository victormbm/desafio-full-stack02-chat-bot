import { Router } from 'express';
import { getSummary, listInteractions } from '../controllers/analytics.controller.js';

const router = Router();

router.get('/summary', getSummary);
router.get('/interactions', listInteractions);

export default router;
