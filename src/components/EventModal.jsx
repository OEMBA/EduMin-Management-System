import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './EventModal.css'

export default function EventModal({ isOpen, onClose, onAddEvent }) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [time, setTime] = useState('09:00')

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value)
    const newDate = new Date(selectedDate)
    newDate.setMonth(newMonth - 1)
    setSelectedDate(newDate)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Please enter an event title')
      return
    }

    const newEvent = {
      month: selectedDate.getMonth() + 1,
      day: selectedDate.getDate(),
      title: title,
      subtitle: `${time} – ${subtitle || 'TBD'}`,
    }

    onAddEvent(newEvent)
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setSubtitle('')
    setSelectedDate(new Date())
    setTime('09:00')
    onClose()
  }

  const handleCancel = () => {
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Event</h2>
          <button className="close-btn" onClick={handleCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Event Title *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Project Presentation"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="month">Select Month</label>
            <select
              id="month"
              value={selectedDate.getMonth() + 1}
              onChange={handleMonthChange}
            >
              {months.map((month, index) => (
                <option key={index} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              minDate={new Date()}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">Location/Description</label>
              <input
                id="subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g., Conference Hall A"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
