import StatsBanner from '../components/StatsBanner'
import RecentStudentsCard from '../components/RecentStudentsCard'
import ActivityCard from '../components/ActivityCard'
import './Dashboard.css'

const RECENT_STUDENTS = [
  { name: 'Alex Johnson', grade: '10', subject: 'General Science', status: 'verified' },
  { name: 'Sarah Smith', grade: '08', subject: 'Arts', status: 'verified' },
  { name: 'Michael Abbeng', grade: '12', subject: 'Economics', status: 'pending' },
  { name: 'Emily Martin', grade: '09', subject: 'Commerce', status: 'verified' },
  { name: 'David Lee', grade: '11', subject: 'General Science', status: 'verified' },
]

const UPCOMING_EVENTS = [
  { month: 3, day: 30, title: 'Project Presentation', subtitle: '9:00 AM – 12:00 PM' },
  { month: 4, day: 4, title: 'Faculty Meeting', subtitle: 'Conference Hall A' },
  { month: 8, day: 1, title: 'Annual Sports Day', subtitle: 'Main Stadium' },
]

export default function Dashboard() {
  return (
    <div className="dashboard">
      <StatsBanner
        label="Academic Year Overview"
        title="Total Enrolled Students"
        value={1250}
        subLabel="Active Records"
      />
      <div className="dashboard-grid">
        <RecentStudentsCard
          students={RECENT_STUDENTS}
          onViewAll={() => alert('Navigate to all students')}
        />
        <ActivityCard
          events={UPCOMING_EVENTS}
          onAddEvent={() => alert('Open add event modal')}
        />
      </div>
    </div>
  )
}
