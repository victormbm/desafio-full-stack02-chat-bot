import { useEffect, useRef, useState } from 'react'
import StatCard from '../components/StatCard.jsx'
import { getDashboardData } from '../services/analyticsService.js'

function isDashboardEmpty(data) {
  return (
    data.stats.length === 0 &&
    data.weeklyQueries.length === 0 &&
    data.categoryDistribution.length === 0 &&
    data.topQuestions.length === 0 &&
    data.unansweredQuestions.length === 0
  )
}

function DashboardPage({ isActive }) {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const mountedRef = useRef(true)
  const wasActiveRef = useRef(false)

  async function loadDashboard() {
    setIsLoading(true)
    setError(false)

    try {
      const data = await getDashboardData()
      if (mountedRef.current) setDashboardData(data)
    } catch {
      if (mountedRef.current) setError(true)
    } finally {
      if (mountedRef.current) setIsLoading(false)
    }
  }

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  useEffect(() => {
    if (isActive && !wasActiveRef.current) {
      loadDashboard()
    }

    wasActiveRef.current = isActive
  }, [isActive])

  const isEmpty = Boolean(dashboardData && isDashboardEmpty(dashboardData))

  return (
    <section className="page" aria-busy={isLoading}>
      <header className="page-heading">
        <div>
          <p className="eyebrow">Visão geral</p>
          <h1>Dashboard analítico</h1>
          <p>Acompanhe o desempenho do atendimento e identifique oportunidades de melhoria.</p>
        </div>
        <span className="period-select">Dados registrados ▾</span>
      </header>

      {isLoading && (
        <>
          <section className="stats-grid" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <article className="stat-card" key={index}>
                <div className="stat-top">
                  <span className="skeleton" style={{ width: '55%', height: 10 }} />
                  <span className="skeleton" style={{ width: 28, height: 28, borderRadius: 9 }} />
                </div>
                <div className="skeleton" style={{ width: '45%', height: 25, margin: '15px 0 7px' }} />
                <div className="skeleton" style={{ width: '35%', height: 10 }} />
              </article>
            ))}
          </section>

          <section className="dashboard-grid" aria-hidden="true">
            <article className="chart-card">
              <header className="chart-header">
                <div>
                  <div className="skeleton" style={{ width: 160, height: 15 }} />
                  <div className="skeleton" style={{ width: 120, height: 11, marginTop: 5 }} />
                </div>
              </header>
              <div className="skeleton" style={{ height: 220, borderRadius: 12 }} />
            </article>

            <article className="chart-card">
              <header className="chart-header">
                <div>
                  <div className="skeleton" style={{ width: 160, height: 15 }} />
                  <div className="skeleton" style={{ width: 120, height: 11, marginTop: 5 }} />
                </div>
              </header>
              <div className="donut-layout">
                <div className="skeleton" style={{ width: 145, height: 145, borderRadius: '50%' }} />
                <div className="category-legend">
                  {[0, 1, 2, 3].map((index) => (
                    <div className="skeleton" style={{ height: 14 }} key={index} />
                  ))}
                </div>
              </div>
            </article>
          </section>

          <section className="bottom-grid" aria-hidden="true">
            <article className="table-card">
              <header className="table-header">
                <div>
                  <div className="skeleton" style={{ width: 180, height: 15 }} />
                  <div className="skeleton" style={{ width: 140, height: 11, marginTop: 5 }} />
                </div>
              </header>
              <div className="question-list">
                {[0, 1, 2, 3].map((index) => (
                  <div className="skeleton" style={{ height: 36, marginBottom: 8, borderRadius: 8 }} key={index} />
                ))}
              </div>
            </article>

            <article className="table-card">
              <header className="table-header">
                <div>
                  <div className="skeleton" style={{ width: 180, height: 15 }} />
                  <div className="skeleton" style={{ width: 140, height: 11, marginTop: 5 }} />
                </div>
              </header>
              <div className="unanswered-list">
                {[0, 1, 2].map((index) => (
                  <div className="skeleton" style={{ height: 46, borderRadius: 8 }} key={index} />
                ))}
              </div>
            </article>
          </section>
        </>
      )}

      {!isLoading && error && (
        <div className="dashboard-state error-state">
          <h2>Não foi possível carregar o dashboard</h2>
          <p>Tivemos um problema ao buscar os dados analíticos. Verifique sua conexão e tente novamente.</p>
          <button type="button" className="retry-button" onClick={loadDashboard}>
            Tentar novamente
          </button>
        </div>
      )}

      {!isLoading && !error && dashboardData && isEmpty && (
        <div className="dashboard-state">
          <h2>Ainda não há dados suficientes</h2>
          <p>Assim que houver interações registradas, as análises do dashboard aparecerão aqui.</p>
        </div>
      )}

      {!isLoading && !error && dashboardData && !isEmpty && (
        <>
          <section className="stats-grid" aria-label="Indicadores principais">
            {dashboardData.stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
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
              <div
                className="bar-chart"
                aria-label="Gráfico de consultas por dia"
                style={{ gridTemplateColumns: `repeat(${dashboardData.weeklyQueries.length}, 1fr)` }}
              >
                {dashboardData.weeklyQueries.map((item) => (
                  <div className="bar-column" key={item.date} title={`${item.total} consultas`}>
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
                <div
                  className="donut"
                  role="img"
                  aria-label="Distribuição das consultas por categoria"
                  style={{ background: dashboardData.categoryGradient }}
                >
                  <div className="donut-center">
                    <strong>{dashboardData.totalQueries}</strong>
                    <span>consultas</span>
                  </div>
                </div>
                <div className="category-legend">
                  {dashboardData.categoryDistribution.map((category) => (
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
                {dashboardData.topQuestions.map((question, index) => (
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
                {dashboardData.unansweredQuestions.map((question) => (
                  <div className="unanswered-item" key={question.text}>
                    <p>{question.text}</p>
                    <span>{question.time}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      )}
    </section>
  )
}

export default DashboardPage
