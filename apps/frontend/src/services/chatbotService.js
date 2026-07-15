import { faqAnswers } from '../data/mockData.js'

const MOCK_DELAY_MS = 350
const fallbackAnswer = 'Ainda não encontrei uma resposta para essa pergunta. Registrei sua dúvida para que nossa equipe possa analisar e melhorar a base de conhecimento.'

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
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

  await wait(MOCK_DELAY_MS)

  const normalizedQuestion = question.toLocaleLowerCase('pt-BR')
  const match = faqAnswers.find((faq) => (
    faq.terms.some((term) => normalizedQuestion.includes(term))
  ))

  return {
    question,
    answer: match?.answer ?? fallbackAnswer,
    matched: Boolean(match),
  }
}
