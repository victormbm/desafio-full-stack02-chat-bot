import { normalizeText } from './faq.service.js';
import { getInteractionHistory } from './interaction.service.js';

const MAX_QUESTION_ITEMS = 5;

function normalizeDisplayText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function sortByTotalAndQuestion(first, second) {
  if (second.total !== first.total) {
    return second.total - first.total;
  }

  return first.question.localeCompare(second.question, 'pt-BR', { sensitivity: 'base' });
}

function getFrequentQuestions(interactions) {
  const groupedQuestions = new Map();

  interactions.forEach((interaction) => {
    const key = normalizeText(interaction.question);
    const current = groupedQuestions.get(key);

    if (current) {
      current.total += 1;
      return;
    }

    groupedQuestions.set(key, {
      question: normalizeDisplayText(interaction.question),
      total: 1,
    });
  });

  return [...groupedQuestions.values()]
    .sort(sortByTotalAndQuestion)
    .slice(0, MAX_QUESTION_ITEMS);
}

function getUnansweredQuestions(interactions) {
  const groupedQuestions = new Map();

  interactions
    .filter((interaction) => interaction.matched === false)
    .forEach((interaction) => {
      const key = normalizeText(interaction.question);
      const current = groupedQuestions.get(key);

      if (current) {
        current.total += 1;

        if (interaction.createdAt > current.lastAskedAt) {
          current.lastAskedAt = interaction.createdAt;
          current.question = normalizeDisplayText(interaction.question);
        }

        return;
      }

      groupedQuestions.set(key, {
        question: normalizeDisplayText(interaction.question),
        total: 1,
        lastAskedAt: interaction.createdAt,
      });
    });

  return [...groupedQuestions.values()]
    .sort((first, second) => {
      if (second.total !== first.total) {
        return second.total - first.total;
      }

      return second.lastAskedAt.localeCompare(first.lastAskedAt);
    })
    .slice(0, MAX_QUESTION_ITEMS);
}

function getQueriesByCategory(interactions) {
  const categories = new Map();

  interactions
    .filter((interaction) => (
      interaction.matched === true
      && typeof interaction.category === 'string'
      && interaction.category.trim()
    ))
    .forEach((interaction) => {
      const category = interaction.category.trim();
      categories.set(category, (categories.get(category) ?? 0) + 1);
    });

  return [...categories.entries()]
    .map(([category, total]) => ({ category, total }))
    .sort((first, second) => (
      second.total - first.total
      || first.category.localeCompare(second.category, 'pt-BR', { sensitivity: 'base' })
    ));
}

function getTimeline(interactions) {
  const queriesByDate = new Map();

  interactions.forEach((interaction) => {
    const date = interaction.createdAt.slice(0, 10);
    queriesByDate.set(date, (queriesByDate.get(date) ?? 0) + 1);
  });

  return [...queriesByDate.entries()]
    .map(([date, total]) => ({ date, total }))
    .sort((first, second) => first.date.localeCompare(second.date));
}

export function getAnalyticsSummary() {
  const interactions = getInteractionHistory();
  const totalQueries = interactions.length;
  const answeredQueries = interactions.filter((interaction) => interaction.matched === true).length;
  const unansweredQueries = totalQueries - answeredQueries;
  const answerRate = totalQueries === 0
    ? 0
    : Number(((answeredQueries / totalQueries) * 100).toFixed(2));

  return {
    summary: {
      totalQueries,
      answeredQueries,
      unansweredQueries,
      answerRate,
    },
    frequentQuestions: getFrequentQuestions(interactions),
    unansweredQuestions: getUnansweredQuestions(interactions),
    queriesByCategory: getQueriesByCategory(interactions),
    timeline: getTimeline(interactions),
  };
}
