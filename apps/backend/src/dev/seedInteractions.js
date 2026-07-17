import { faqs } from '../data/faqs.js';
import { recordInteraction } from '../services/interaction.service.js';

const DAYS_BACK = 6;

function daysAgoIso(daysAgo, hour) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

// Só roda quando SEED_DEV_DATA=true — nunca entra na aplicação real por acidente.
export function seedDevInteractions() {
  const sampleFaqs = faqs.slice(0, 6);

  for (let daysAgo = DAYS_BACK; daysAgo >= 0; daysAgo -= 1) {
    const countToday = 2 + Math.floor(Math.random() * 4);

    for (let i = 0; i < countToday; i += 1) {
      const faq = sampleFaqs[(daysAgo + i) % sampleFaqs.length];

      recordInteraction({
        question: faq.question,
        answer: faq.answer,
        matched: true,
        category: faq.category,
        createdAt: daysAgoIso(daysAgo, 9 + i),
      });
    }
  }

  recordInteraction({
    question: 'Vocês entregam fora do Brasil?',
    answer: null,
    matched: false,
    category: null,
    createdAt: daysAgoIso(1, 14),
  });

  recordInteraction({
    question: 'Existe desconto para empresas?',
    answer: null,
    matched: false,
    category: null,
    createdAt: daysAgoIso(0, 16),
  });

  console.log('[dev] Dados fake de interações semeados (SEED_DEV_DATA=true).');
}
