import StatCard from '../components/StatCard.jsx'
import {
  categoryDistribution,
  topQuestions,
  unansweredQuestions,
  weeklyQueries,
} from '../data/mockData.js'

function DashboardPage() {
  return (
    <section className="page">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Visão geral</p>
          <h1>Dashboard analítico</h1>
          <p>Acompanhe o desempenho do atendimento e identifique oportunidades de melhoria.</p>
        </div>
        <span className="period-select">Últimos 7 dias ▾</span>
      </header>

      <section className="stats-grid" aria-label="Indicadores principais">
        <StatCard label="Total de consultas" value="1.284" change="↑ 12,5% no período" short="TC" />
        <StatCard label="Taxa de resolução" value="87,4%" change="↑ 4,2% no período" short="TR" />
        <StatCard label="Sem resposta" value="42" change="↓ 8,1% no período" short="SR" />
        <StatCard label="Tempo médio" value="1,8s" change="Dentro da meta" short="TM" neutral />
      </section>

      <section className="dashboard-grid">
        <article className="chart-card">
          <header className="chart-header">
            <div>
              <h2>Evolução das consultas</h2>
              <p className="chart-subtitle">Volume diário de interações</p>
            </div>
            <span className="legend"><i className="legend-dot" /> Consultas</span>
          </header>
          <div className="bar-chart" aria-label="Gráfico de consultas por dia">
            {weeklyQueries.map((item) => (
              <div className="bar-column" key={item.day} title={`${item.value * 3} consultas`}>
                <div className="bar" style={{ height: `${item.value}%` }} />
                <span className="bar-label">{item.day}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="chart-card">
          <header className="chart-header">
            <div>
              <h2>Consultas por categoria</h2>
              <p className="chart-subtitle">Distribuição no período</p>
            </div>
          </header>
          <div className="donut-layout">
            <div className="donut" role="img" aria-label="Distribuição das consultas por categoria">
              <div className="donut-center">
                <strong>1.284</strong>
                <span>consultas</span>
              </div>
            </div>
            <div className="category-legend">
              {categoryDistribution.map((category) => (
                <div className="category-legend-item" key={category.label}>
                  <i style={{ background: category.color }} />
                  <span>{category.label}</span>
                  <strong>{category.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="bottom-grid">
        <article className="table-card">
          <header className="table-header">
            <div>
              <h2>Perguntas mais frequentes</h2>
              <p className="table-subtitle">Principais dúvidas dos usuários</p>
            </div>
          </header>
          <div className="question-list">
            {topQuestions.map((question, index) => (
              <div className="question-row" key={question.text}>
                <span className="rank">{index + 1}</span>
                <span className="question-text">{question.text}</span>
                <span className="question-count">{question.count} consultas</span>
              </div>
            ))}
          </div>
        </article>

        <article className="table-card">
          <header className="table-header">
            <div>
              <h2>Perguntas sem resposta</h2>
              <p className="table-subtitle">Oportunidades para ampliar a base</p>
            </div>
          </header>
          <div className="unanswered-list">
            {unansweredQuestions.map((question) => (
              <div className="unanswered-item" key={question.text}>
                <p>{question.text}</p>
                <span>{question.time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  )
}

export default DashboardPage
