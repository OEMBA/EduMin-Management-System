import StudentRow from './StudentRow'
import './RecentStudentsCard.css'

export default function RecentStudentsCard({ students = [], onViewAll }) {
  return (
    <div className="card recent-students-card">
      <div className="card-header">
        <span className="card-title"><span className="card-title-icon">⏱</span> Recently Admitted</span>
        <button className="view-all-btn" onClick={onViewAll}>View All</button>
      </div>
      <div className="student-list">
        {students.map((s, i) => (
          <StudentRow key={i} {...s} />
        ))}
      </div>
    </div>
  )
}
