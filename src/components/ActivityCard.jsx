import './ActivityCard.css'

const MONTH_ABBR = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export function EventItem({ month, day, title, subtitle }) {
  const monthLabel = typeof month === 'number' ? MONTH_ABBR[month - 1] : month
  return (
    <div className="event-item">
      <div className="event-date">
        <span className="event-month">{monthLabel}</span>
        <span className="event-day">{String(day).padStart(2, '0')}</span>
      </div>
      <div className="event-info">
        <span className="event-title">{title}</span>
        <span className="event-sub">{subtitle}</span>
      </div>
    </div>
  )
}

export default function ActivityCard({ events = [], onAddEvent }) {
  return (
    <div className="card activity-card">
      <div className="card-header activity-header">
        <span className="card-title"><span className="card-title-icon">📅</span> Upcoming Activities</span>
      </div>
      <div className="event-list">
        {events.map((ev, i) => (
          <EventItem key={i} {...ev} />
        ))}
      </div>
      <button className="add-event-btn" onClick={onAddEvent}>
        + Add Event
      </button>
    </div>
  )
}
