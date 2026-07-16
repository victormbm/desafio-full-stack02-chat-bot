import { getInteractionHistory } from '../services/interaction.service.js';

export function getSummary(_req, res) {
  res.json({
    totalQueries: 0,
    topQuestions: [],
    unansweredQuestions: [],
    queriesByCategory: [],
    queriesOverTime: [],
  });
}

export function listInteractions(_req, res) {
  res.json(getInteractionHistory());
}
