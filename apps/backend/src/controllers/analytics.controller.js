export function getSummary(_req, res) {
  res.json({
    totalQueries: 0,
    topQuestions: [],
    unansweredQuestions: [],
    queriesByCategory: [],
    queriesOverTime: [],
  });
}
