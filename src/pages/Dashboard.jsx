import { useState } from 'react'
import StatsBanner from '../components/StatsBanner'
import RecentStudentsCard from '../components/RecentStudentsCard'
import ActivityCard from '../components/ActivityCard'
import EventModal from '../components/EventModal'
import { useStudents } from '../context/StudentContext'
import './Dashboard.css'

export default function Dashboard() {
  const { getStudentCount, getRecentStudents } = useStudents()
  
  // Total students count from context
  const totalStudents = getStudentCount()
  const RECENT_STUDENTS = getRecentStudents(5)
  
  // State for events and modal
  const [events, setEvents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent])
    setIsModalOpen(false)
  }

  const handleDeleteEvent = (eventIndex) => {
    setEvents(events.filter((_, i) => i !== eventIndex))
  }

  const handleOpenAddEventModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="dashboard">
      <StatsBanner
        label="Academic Year Overview"
        title="Total Enrolled Students"
        value={totalStudents}
        subLabel="Active Records"
      />
      <div className="dashboard-grid">
        <RecentStudentsCard
          students={RECENT_STUDENTS}
          onViewAll={() => alert('Navigate to all students')}
        />
        <ActivityCard
          events={events}
          onAddEvent={handleOpenAddEventModal}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddEvent={handleAddEvent}
      />
    </div>
  )
}
