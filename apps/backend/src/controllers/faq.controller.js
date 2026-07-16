import { findFaqByQuestion, getAllFaqs, getSuggestions } from '../services/faq.service.js';
import { recordInteraction } from '../services/interaction.service.js';

export function listFaqs(_req, res) {
  res.json(getAllFaqs());
}

export function getFaqSuggestions(_req, res) {
  res.json(getSuggestions());
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
  const response = {
    question,
    answer: matchedFaq?.answer ?? null,
    matched: Boolean(matchedFaq),
    category: matchedFaq?.category ?? null,
  };

  recordInteraction(response);

  return res.json(response);
}
