function StatCard({ label, value, change, short, neutral = false }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon" aria-hidden="true">{short}</span>
      </div>
      <p className="stat-value">{value}</p>
      <span className={`stat-change ${neutral ? 'neutral' : ''}`}>{change}</span>
    </article>
  )
}

export default StatCard
