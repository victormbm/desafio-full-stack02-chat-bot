import { categories, faqs, quickQuestions } from '../data/faqs.js';

// Um único token isolado em comum (ex.: "quando", "segunda") não basta pra
// provar relação com a FAQ — precisa de frase inteira batendo (bônus abaixo)
// ou de pelo menos 2 tokens em comum, senão qualquer palavra do dia a dia
// que aparece à toa numa keyword vira falso positivo.
const MIN_MATCH_SCORE = 2;

const TOKEN_ALIASES = new Map([
  ['troco', 'troca'],
  ['trocar', 'troca'],
  ['trocas', 'troca'],
  ['devolvo', 'devolucao'],
  ['devolver', 'devolucao'],
  ['devolucoes', 'devolucao'],
  ['faco', 'fazer'],
  ['solicito', 'solicitar'],
  ['receberei', 'receber'],
  ['acompanho', 'acompanhar'],
  ['acompanhamento', 'acompanhar'],
  ['rastrear', 'rastreio'],
  ['rastreamento', 'rastreio'],
  ['recupero', 'recuperar'],
  ['altero', 'alterar'],
  ['excluo', 'excluir'],
  ['parcelo', 'parcelar'],
]);

export function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getSearchTokens(text) {
  return normalizeText(text)
    .split(' ')
    .filter((token) => token.length >= 3)
    .map((token) => TOKEN_ALIASES.get(token) ?? token);
}

function calculateScore(question, keywords) {
  const questionTokens = getSearchTokens(question);
  const questionTokenSet = new Set(questionTokens);
  const matchedTokens = new Set();
  let exactMatchBonus = 0;

  keywords.forEach((keyword) => {
    const keywordTokens = getSearchTokens(keyword);

    if (questionTokens.join(' ').includes(keywordTokens.join(' '))) {
      exactMatchBonus = 1;
    }

    keywordTokens.forEach((token) => {
      if (questionTokenSet.has(token)) {
        matchedTokens.add(token);
      }
    });
  });

  return matchedTokens.size + exactMatchBonus;
}

export function getAllFaqs() {
  return faqs;
}

export function getSuggestions() {
  return { categories, quickQuestions };
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

  return bestMatch.score >= MIN_MATCH_SCORE ? bestMatch.faq : null;
}
