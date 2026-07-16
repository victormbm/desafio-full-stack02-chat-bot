import { faqs } from '../data/faqs.js';

function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function calculateScore(question, keywords) {
  const questionTokens = new Set(question.split(' ').filter((token) => token.length >= 3));

  return keywords.reduce((total, keyword) => {
    const normalizedKeyword = normalizeText(keyword);

    if (question.includes(normalizedKeyword)) {
      return total + normalizedKeyword.split(' ').length + 1;
    }

    const matchingTokens = normalizedKeyword
      .split(' ')
      .filter((token) => token.length >= 3 && questionTokens.has(token));

    return total + matchingTokens.length;
  }, 0);
}

export function getAllFaqs() {
  return faqs;
}

export function findFaqByQuestion(question) {
  const normalizedQuestion = normalizeText(question);

  const bestMatch = faqs.reduce((currentBest, faq) => {
    const score = calculateScore(normalizedQuestion, faq.keywords);

    if (score > currentBest.score) {
      return { faq, score };
    }

    return currentBest;
  }, { faq: null, score: 0 });

  return bestMatch.score > 0 ? bestMatch.faq : null;
}
