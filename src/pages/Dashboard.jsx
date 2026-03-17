import { useState } from 'react'
import StatsBanner from '../components/StatsBanner'
import RecentStudentsCard from '../components/RecentStudentsCard'
import ActivityCard from '../components/ActivityCard'
import EventModal from '../components/EventModal'
import './Dashboard.css'

// Complete list of all students - local data source
const STUDENTS = [
  { id: 1, name: 'Alex Johnson', grade: '10', subject: 'General Science', status: 'verified' },
  { id: 2, name: 'Sarah Smith', grade: '08', subject: 'Arts', status: 'verified' },
  { id: 3, name: 'Michael Abbeng', grade: '12', subject: 'Economics', status: 'pending' },
  { id: 4, name: 'Emily Martin', grade: '09', subject: 'Commerce', status: 'verified' },
  { id: 5, name: 'David Lee', grade: '11', subject: 'General Science', status: 'verified' },
  { id: 6, name: 'Jessica Wong', grade: '10', subject: 'Mathematics', status: 'verified' },
  { id: 7, name: 'Robert Taylor', grade: '12', subject: 'Physics', status: 'verified' },
  { id: 8, name: 'Adolf Boateng', grade: '09', subject: 'History', status: 'pending' },
  { id: 9, name: 'Henry Okyere', grade: '09', subject: 'History', status: 'pending' },
  { id: 10, name: 'Samuel Appiah', grade: '09', subject: 'History', status: 'pending' },
  { id: 11, name: 'Diana Asante', grade: '09', subject: 'History', status: 'pending' },
  { id: 12, name: 'Ama Darko', grade: '09', subject: 'History', status: 'pending' },
  { id: 13, name: 'Sylvia Mensah', grade: '09', subject: 'History', status: 'pending' },
  { id: 14, name: 'Solomon Asante', grade: '09', subject: 'History', status: 'pending' },
  { id: 15, name: 'Samuel Kumi', grade: '09', subject: 'History', status: 'pending' },
]

// Get recently admitted (first 5 students)
const RECENT_STUDENTS = STUDENTS.slice(0, 5)

const UPCOMING_EVENTS = [
  { month: 3, day: 30, title: 'Project Presentation', subtitle: '9:00 AM – 12:00 PM' },
  { month: 4, day: 4, title: 'Faculty Meeting', subtitle: 'Conference Hall A' },
  { month: 8, day: 1, title: 'Annual Sports Day', subtitle: 'Main Stadium' },
]

export default function Dashboard() {
  // Total students count from the local list
  const totalStudents = STUDENTS.length
  
  // State for events and modal
  const [events, setEvents] = useState(UPCOMING_EVENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddEvent = (newEvent) => {
    setEvents([...events, newEvent])
    setIsModalOpen(false)
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
