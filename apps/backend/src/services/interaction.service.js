import { randomUUID } from 'node:crypto';

const interactions = [];

export function recordInteraction({ question, answer, matched, category, createdAt }) {
  const interaction = {
    id: randomUUID(),
    question,
    answer,
    matched,
    category,
    createdAt: createdAt ?? new Date().toISOString(),
  };

  interactions.unshift(interaction);

  return interaction;
}

export function getInteractionHistory() {
  return interactions.map((interaction) => ({ ...interaction }));
}
