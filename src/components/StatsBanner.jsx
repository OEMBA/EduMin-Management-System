import './StatsBanner.css'

export default function StatsBanner({ label = 'Academic Year Overview', title, value, subLabel }) {
  return (
    <div className="stats-banner">
      <div className="stats-banner-left">
        <p className="stats-label">{label}</p>
        <h2 className="stats-title">{title}</h2>
      </div>
      <div className="stats-banner-right">
        <span className="stats-value">{value.toLocaleString()}</span>
        <span className="stats-sub">{subLabel}</span>
      </div>
    </div>
  )
}
