import { useState } from 'react'
import DeleteConfirmModal from './DeleteConfirmModal'
import './ActivityCard.css'

const MONTH_ABBR = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']

export function EventItem({ month, day, title, subtitle, onDelete, eventIndex }) {
  const monthLabel = typeof month === 'number' ? MONTH_ABBR[month - 1] : month
  
  const handleClick = () => {
    if (onDelete) {
      onDelete(eventIndex)
    }
  }
  
  return (
    <div className="event-item" onClick={handleClick} style={{ cursor: 'pointer' }}>
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

export default function ActivityCard({ events = [], onAddEvent, onDeleteEvent }) {
  const [deleteConfirmState, setDeleteConfirmState] = useState({
    isOpen: false,
    eventIndex: null,
    eventTitle: ''
  })

  const handleEventClick = (eventIndex, eventTitle) => {
    setDeleteConfirmState({
      isOpen: true,
      eventIndex: eventIndex,
      eventTitle: eventTitle
    })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirmState.eventIndex !== null) {
      onDeleteEvent(deleteConfirmState.eventIndex)
    }
    setDeleteConfirmState({ isOpen: false, eventIndex: null, eventTitle: '' })
  }

  const handleCancelDelete = () => {
    setDeleteConfirmState({ isOpen: false, eventIndex: null, eventTitle: '' })
  }

  return (
    <div className="card activity-card">
      <div className="card-header activity-header">
        <span className="card-title"><span className="card-title-icon">📅</span> Upcoming Activities</span>
      </div>
      <div className="event-list">
        {events.map((ev, i) => (
          <div key={i} onClick={() => handleEventClick(i, ev.title)}>
            <EventItem {...ev} eventIndex={i} onDelete={null} />
          </div>
        ))}
      </div>
      <button className="add-event-btn" onClick={onAddEvent}>
        + Add Event
      </button>

      <DeleteConfirmModal
        isOpen={deleteConfirmState.isOpen}
        eventTitle={deleteConfirmState.eventTitle}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  )
}
