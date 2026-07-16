import test from 'node:test';
import assert from 'node:assert/strict';
import { findFaqByQuestion } from '../src/services/faq.service.js';

test('encontra uma FAQ para uma variação do verbo trocar', () => {
  const faq = findFaqByQuestion('Como troco meu produto?');

  assert.equal(faq?.id, 'faq-7');
});

test('encontra uma FAQ para uma variação de devolução', () => {
  const faq = findFaqByQuestion('Quero devolver o produto');

  assert.equal(faq?.id, 'faq-8');
});

test('mantém correspondência para uma pergunta conhecida', () => {
  const faq = findFaqByQuestion('Como acompanho meu pedido?');

  assert.equal(faq?.id, 'faq-1');
});

test('mantém as sugestões atuais vinculadas às FAQs corretas', () => {
  const suggestions = [
    ['Como acompanho meu pedido?', 'faq-1'],
    ['Quais são as formas de pagamento?', 'faq-4'],
    ['Como solicito uma troca?', 'faq-7'],
    ['Como recupero minha senha?', 'faq-11'],
    ['Qual é o prazo de entrega?', 'faq-2'],
    ['Como faço uma devolução?', 'faq-8'],
  ];

  suggestions.forEach(([question, expectedId]) => {
    assert.equal(findFaqByQuestion(question)?.id, expectedId);
  });
});

test('aceita uma palavra-chave específica cadastrada isoladamente', () => {
  const faq = findFaqByQuestion('Estorno');

  assert.equal(faq?.id, 'faq-9');
});

test('não responde com base em um único termo genérico repetido nas keywords', () => {
  const faq = findFaqByQuestion('Pedido');

  assert.equal(faq, null);
});

test('não confunde uma pergunta fora do domínio com prazo de entrega', () => {
  const faq = findFaqByQuestion('Quando foi a segunda guerra mundial?');

  assert.equal(faq, null);
});

test('mantém perguntas desconhecidas sem correspondência', () => {
  const faq = findFaqByQuestion('Quanto é dois mais dois?');

  assert.equal(faq, null);
});
