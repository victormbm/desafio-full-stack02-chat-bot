export function listFaqs(_req, res) {
  res.json([]);
}

export function askQuestion(req, res) {
  const { question } = req.body;
  res.json({ question, answer: null, matched: false });
}
