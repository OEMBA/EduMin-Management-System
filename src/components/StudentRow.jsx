import './StudentRow.css'

const STATUS_CONFIG = {
  verified: { label: 'Verified', icon: '✅', className: 'status-verified' },
  pending: { label: 'Pending', icon: '⚠️', className: 'status-pending' },
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function StudentRow({ name, grade, subject, status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.verified

  return (
    <div className="student-row">
      <div className="student-avatar">{getInitials(name)}</div>
      <div className="student-info">
        <span className="student-name">{name}</span>
        <span className="student-meta">Grade {grade} · {subject}</span>
      </div>
      <span className={`student-status ${cfg.className}`}>
        {cfg.icon} {cfg.label}
      </span>
    </div>
  )
}
