import { Router } from 'express';
import { askQuestion, listFaqs } from '../controllers/faq.controller.js';

const router = Router();

router.get('/', listFaqs);
router.post('/ask', askQuestion);

export default router;
