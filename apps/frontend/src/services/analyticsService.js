const API_URL = 'http://localhost:3001/api/analytics/summary'
const CATEGORY_COLORS = ['#126e5a', '#46ad8c', '#8fd4bc', '#d5eee6']

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits }).format(value)
}

function formatDay(date) {
  const formattedDay = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' })
    .format(new Date(`${date}T00:00:00`))
    .replace('.', '')

  return formattedDay.charAt(0).toLocaleUpperCase('pt-BR') + formattedDay.slice(1)
}

function formatDateTime(date) {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}

function mapStats(summary) {
  return [
    {
      label: 'Total de consultas',
      value: formatNumber(summary.totalQueries),
      change: 'Interações registradas',
      short: 'TC',
      neutral: true,
    },
    {
      label: 'Consultas respondidas',
      value: formatNumber(summary.answeredQueries),
      change: 'Respostas encontradas',
      short: 'CR',
      neutral: true,
    },
    {
      label: 'Sem resposta',
      value: formatNumber(summary.unansweredQueries),
      change: 'Oportunidades de melhoria',
      short: 'SR',
      neutral: true,
    },
    {
      label: 'Taxa de resolução',
      value: `${formatNumber(summary.answerRate, 2)}%`,
      change: 'Percentual de respostas',
      short: 'TR',
      neutral: true,
    },
  ]
}

function mapTimeline(timeline) {
  const recentTimeline = timeline.slice(-7)
  const highestTotal = Math.max(...recentTimeline.map((item) => item.total), 1)

  return recentTimeline.map((item) => ({
    day: formatDay(item.date),
    value: Math.max((item.total / highestTotal) * 100, 8),
    total: item.total,
    date: item.date,
  }))
}

function mapCategories(queriesByCategory) {
  const total = queriesByCategory.reduce((sum, item) => sum + item.total, 0)
  let accumulatedPercentage = 0

  const categories = queriesByCategory.map((item, index) => {
    const percentage = total === 0 ? 0 : (item.total / total) * 100
    const start = Number(accumulatedPercentage.toFixed(4))
    accumulatedPercentage += percentage
    const end = index === queriesByCategory.length - 1
      ? 100
      : Number(accumulatedPercentage.toFixed(4))

    return {
      label: item.category,
      value: `${formatNumber(percentage, 1)}%`,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      gradientRange: [start, end],
    }
  })

  const categoryGradient = categories.length === 0
    ? '#e5eeeb'
    : `conic-gradient(${categories.map((category) => (
      `${category.color} ${category.gradientRange[0]}% ${category.gradientRange[1]}%`
    )).join(', ')})`

  return {
    total,
    categoryGradient,
    categories: categories.map(({ gradientRange: _gradientRange, ...category }) => category),
  }
}

function mapUnansweredQuestions(unansweredQuestions) {
  return unansweredQuestions.map((item) => ({
    text: item.question,
    time: item.total > 1
      ? `${item.total} consultas · ${formatDateTime(item.lastAskedAt)}`
      : formatDateTime(item.lastAskedAt),
  }))
}

export async function getDashboardData() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Falha ao carregar os dados analíticos.')
  }

  const data = await response.json()

  if (data.summary.totalQueries === 0) {
    return {
      stats: [],
      totalQueries: '0',
      weeklyQueries: [],
      categoryDistribution: [],
      categoryGradient: '#e5eeeb',
      topQuestions: [],
      unansweredQuestions: [],
    }
  }

  const categoryData = mapCategories(data.queriesByCategory)

  return {
    stats: mapStats(data.summary),
    totalQueries: formatNumber(categoryData.total),
    weeklyQueries: mapTimeline(data.timeline),
    categoryDistribution: categoryData.categories,
    categoryGradient: categoryData.categoryGradient,
    topQuestions: data.frequentQuestions.map((item) => ({
      text: item.question,
      count: item.total,
    })),
    unansweredQuestions: mapUnansweredQuestions(data.unansweredQuestions),
  }
}
