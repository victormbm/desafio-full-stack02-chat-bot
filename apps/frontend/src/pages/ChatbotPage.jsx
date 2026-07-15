import { useState } from 'react'
import { categories, faqAnswers, quickQuestions } from '../data/mockData.js'

const initialMessages = [
  {
    id: 1,
    author: 'bot',
    text: 'Olá! Eu sou o assistente virtual da Atende. Como posso ajudar você hoje?',
  },
]

function findAnswer(question) {
  const normalizedQuestion = question.toLocaleLowerCase('pt-BR')
  const match = faqAnswers.find((faq) => faq.terms.some((term) => normalizedQuestion.includes(term)))

  return match?.answer ?? 'Ainda não encontrei uma resposta para essa pergunta. Registrei sua dúvida para que nossa equipe possa analisar e melhorar a base de conhecimento.'
}

function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [question, setQuestion] = useState('')

  function submitQuestion(text) {
    const cleanQuestion = text.trim()
    if (!cleanQuestion) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), author: 'user', text: cleanQuestion },
      { id: crypto.randomUUID(), author: 'bot', text: findAnswer(cleanQuestion) },
    ])
    setQuestion('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    submitQuestion(question)
  }

  return (
    <section className="page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Atendimento inteligente</p>
          <h1>Central de ajuda</h1>
          <p>Encontre respostas rápidas para as dúvidas mais frequentes.</p>
        </div>
        <span className="status-pill">Assistente online</span>
      </header>

      <div className="chat-layout">
        <section className="panel chat-panel" aria-label="Conversa com o assistente">
          <header className="chat-header">
            <span className="bot-avatar" aria-hidden="true">IA</span>
            <div>
              <strong>Assistente Atende</strong>
              <span>Responde em poucos segundos</span>
            </div>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`message-row ${message.author}`}>
                {message.author === 'bot' && <span className="message-avatar">IA</span>}
                <div className="message-bubble">{message.text}</div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="quick-questions">
                {quickQuestions.map((item) => (
                  <button key={item} type="button" className="quick-question" onClick={() => submitQuestion(item)}>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              className="chat-input"
              type="text"
              value={question}
              placeholder="Digite sua pergunta..."
              aria-label="Digite sua pergunta"
              onChange={(event) => setQuestion(event.target.value)}
            />
            <button className="send-button" type="submit" aria-label="Enviar pergunta">↑</button>
          </form>
        </section>

        <aside className="chat-aside">
          <section className="aside-card">
            <h2>Explore por categoria</h2>
            <p>Escolha um assunto para começar.</p>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  className="category-button"
                  onClick={() => setQuestion(category.name)}
                >
                  <span className="category-icon" aria-hidden="true">{category.short}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </section>

          <section className="aside-card help-card">
            <h2>Não encontrou o que precisa?</h2>
            <p>Nossa equipe está disponível para dúvidas que exigem atendimento especializado.</p>
            <button type="button" className="help-link">Falar com atendente →</button>
          </section>
        </aside>
      </div>
    </section>
  )
}

export default ChatbotPage
