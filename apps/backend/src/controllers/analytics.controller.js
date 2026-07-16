import { getInteractionHistory } from '../services/interaction.service.js';
import { getAnalyticsSummary } from '../services/analytics.service.js';

export function getSummary(_req, res) {
  res.json(getAnalyticsSummary());
}

export function listInteractions(_req, res) {
  res.json(getInteractionHistory());
}
