import { Router } from 'express';
import { askQuestion, getFaqSuggestions, listFaqs } from '../controllers/faq.controller.js';

const router = Router();

router.get('/', listFaqs);
router.get('/suggestions', getFaqSuggestions);
router.post('/ask', askQuestion);

export default router;
