import { useState } from 'react'
import { categories, quickQuestions } from '../data/mockData.js'
import { sendChatMessage } from '../services/chatbotService.js'

const initialMessages = [
  {
    id: 1,
    author: 'bot',
    text: 'Olá! Eu sou o assistente virtual da Atende. Como posso ajudar você hoje?',
  },
]

function ChatbotPage() {
  const [messages, setMessages] = useState(initialMessages)
  const [question, setQuestion] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [pendingError, setPendingError] = useState(null)

  async function askAssistant(cleanQuestion) {
    setIsSending(true)

    try {
      const response = await sendChatMessage(cleanQuestion)
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), author: 'bot', text: response.answer },
      ])
      setPendingError(null)
    } catch {
      setPendingError({ question: cleanQuestion })
    } finally {
      setIsSending(false)
    }
  }

  async function submitQuestion(text) {
    const cleanQuestion = text.trim()
    if (!cleanQuestion || isSending) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), author: 'user', text: cleanQuestion },
    ])
    setQuestion('')
    setPendingError(null)

    await askAssistant(cleanQuestion)
  }

  function retryLastQuestion() {
    if (!pendingError || isSending) return
    askAssistant(pendingError.question)
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

            {isSending && (
              <div className="message-row bot">
                <span className="message-avatar">IA</span>
                <div className="message-bubble typing">Assistente está digitando...</div>
              </div>
            )}

            {!isSending && pendingError && (
              <div className="message-row bot">
                <span className="message-avatar">IA</span>
                <div className="message-bubble error">
                  <p>Não consegui responder agora. Tente novamente em instantes.</p>
                  <button type="button" className="quick-question" onClick={retryLastQuestion}>
                    Tentar novamente
                  </button>
                </div>
              </div>
            )}

            {messages.length === 1 && (
              <div className="quick-questions">
                {quickQuestions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="quick-question"
                    disabled={isSending}
                    onClick={() => submitQuestion(item)}
                  >
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
              disabled={isSending}
              onChange={(event) => setQuestion(event.target.value)}
            />
            <button className="send-button" type="submit" aria-label="Enviar pergunta" disabled={isSending}>↑</button>
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
