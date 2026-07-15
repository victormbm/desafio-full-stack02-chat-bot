import {
  categoryDistribution,
  dashboardStats,
  topQuestions,
  unansweredQuestions,
  weeklyQueries,
} from '../data/mockData.js'

const MOCK_DELAY_MS = 350

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getDashboardData() {
  await wait(MOCK_DELAY_MS)

  return {
    stats: dashboardStats,
    totalQueries: dashboardStats[0].value,
    weeklyQueries,
    categoryDistribution,
    topQuestions,
    unansweredQuestions,
  }
}
