import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAnalyticsSummary } from '../src/services/analytics.service.js';

const interactions = [
  {
    id: '1',
    question: 'Pergunta A',
    matched: true,
    category: 'Pedidos e entregas',
    createdAt: '2026-07-13T10:00:00.000Z',
  },
  {
    id: '2',
    question: 'Pergunta B',
    matched: true,
    category: 'Pagamentos',
    createdAt: '2026-07-13T15:00:00.000Z',
  },
  {
    id: '3',
    question: 'Pergunta C',
    matched: false,
    category: null,
    createdAt: '2026-07-15T11:00:00.000Z',
  },
  {
    id: '4',
    question: 'Pergunta D',
    matched: true,
    category: 'Minha conta',
    createdAt: '2026-07-16T09:00:00.000Z',
  },
];

test('agrupa interações do mesmo dia na timeline', () => {
  const { timeline } = buildAnalyticsSummary(interactions);
  const day13 = timeline.find((item) => item.date === '2026-07-13');

  assert.equal(day13.total, 2);
});

test('calcula o total correto de cada dia na timeline', () => {
  const { timeline } = buildAnalyticsSummary(interactions);

  assert.deepEqual(
    timeline.map((item) => item.total),
    [2, 1, 1],
  );
});

test('ordena a timeline cronologicamente', () => {
  const { timeline } = buildAnalyticsSummary(interactions);

  assert.deepEqual(
    timeline.map((item) => item.date),
    ['2026-07-13', '2026-07-15', '2026-07-16'],
  );
});

test('não inventa datas sem interação na timeline', () => {
  const { timeline } = buildAnalyticsSummary(interactions);

  assert.deepEqual(timeline, [
    { date: '2026-07-13', total: 2 },
    { date: '2026-07-15', total: 1 },
    { date: '2026-07-16', total: 1 },
  ]);
});

test('mantém o resumo geral correto', () => {
  const { summary } = buildAnalyticsSummary(interactions);

  assert.deepEqual(summary, {
    totalQueries: 4,
    answeredQueries: 3,
    unansweredQueries: 1,
    answerRate: 75,
  });
});

test('agrupa consultas por categoria apenas entre as respondidas', () => {
  const { queriesByCategory } = buildAnalyticsSummary(interactions);

  assert.deepEqual(queriesByCategory, [
    { category: 'Minha conta', total: 1 },
    { category: 'Pagamentos', total: 1 },
    { category: 'Pedidos e entregas', total: 1 },
  ]);
});

test('lista a pergunta sem resposta corretamente', () => {
  const { unansweredQuestions } = buildAnalyticsSummary(interactions);

  assert.equal(unansweredQuestions.length, 1);
  assert.equal(unansweredQuestions[0].question, 'Pergunta C');
  assert.equal(unansweredQuestions[0].total, 1);
});

test('lista as perguntas mais frequentes sem duplicar', () => {
  const { frequentQuestions } = buildAnalyticsSummary(interactions);

  assert.deepEqual(
    frequentQuestions.map((item) => item.question),
    ['Pergunta A', 'Pergunta B', 'Pergunta C', 'Pergunta D'],
  );
  frequentQuestions.forEach((item) => assert.equal(item.total, 1));
});
