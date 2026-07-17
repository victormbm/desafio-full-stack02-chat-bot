const BASE_URL = '/api/faq'
const fallbackAnswer = 'Ainda não encontrei uma resposta para essa pergunta. Registrei sua dúvida para que nossa equipe possa analisar e melhorar a base de conhecimento.'

export async function getChatSuggestions() {
  const response = await fetch(`${BASE_URL}/suggestions`)

  if (!response.ok) {
    throw new Error('Falha ao carregar sugestões do assistente.')
  }

  return response.json()
}

export async function sendChatMessage(message) {
  const question = message.trim()

  if (!question) {
    return {
      question,
      answer: fallbackAnswer,
      matched: false,
    }
  }

  const response = await fetch(`${BASE_URL}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })

  if (!response.ok) {
    throw new Error('Falha ao consultar o assistente.')
  }

  const data = await response.json()

  return {
    question: data.question,
    answer: data.matched ? data.answer : fallbackAnswer,
    matched: data.matched,
  }
}
