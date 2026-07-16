import { findFaqByQuestion, getAllFaqs } from '../services/faq.service.js';

export function listFaqs(_req, res) {
  res.json(getAllFaqs());
}

export function askQuestion(req, res) {
  const question = typeof req.body?.question === 'string'
    ? req.body.question.trim()
    : '';

  if (!question) {
    return res.status(400).json({
      error: 'A pergunta é obrigatória.',
    });
  }

  const matchedFaq = findFaqByQuestion(question);

  if (!matchedFaq) {
    return res.json({
      question,
      answer: null,
      matched: false,
      category: null,
    });
  }

  return res.json({
    question,
    answer: matchedFaq.answer,
    matched: true,
    category: matchedFaq.category,
  });
}
