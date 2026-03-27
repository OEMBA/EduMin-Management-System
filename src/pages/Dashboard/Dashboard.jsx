import { useEffect, useMemo, useState } from 'react'
import { getStudentFullName, loadStudents } from '../../lib/studentsStorage.jsx'

const EVENT_STORAGE_KEY = 'upcomingEvents'

function loadEvents() {
  try {
    const raw = localStorage.getItem(EVENT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveEvents(events) {
  localStorage.setItem(EVENT_STORAGE_KEY, JSON.stringify(events))
}

function initialsFromStudent(student) {
  if (!student) return 'ST'
  const fullName = getStudentFullName(student)
  const parts = fullName.split(' ').filter(Boolean)
  return parts.length === 0 ? 'ST' : (parts[0]?.[0] || 'S') + (parts[1]?.[0] || '')
}

function monthName(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'TBD'
  return date.toLocaleString('en-US', { month: 'short' })
}

function dayNumber(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return '--'
  return date.getDate()
}

export function Dashboard() {
  const [students, setStudents] = useState([])
  const [events, setEvents] = useState([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '' })
  const [eventErrors, setEventErrors] = useState({})

  useEffect(() => {
    setStudents(loadStudents())
    setEvents(loadEvents())
  }, [])

  useEffect(() => {
    saveEvents(events)
  }, [events])

  const totalStudents = students.length
  const recentlyAdmitted = useMemo(() => [...students].reverse(), [students])
  const upcomingEvents = useMemo(() => {
    const future = events
      .map((e) => ({ ...e, dateValue: new Date(e.date).getTime() }))
      .filter((e) => !Number.isNaN(e.dateValue) && e.dateValue >= Date.now())
      .sort((a, b) => a.dateValue - b.dateValue)

    if (future.length) return future
    return events
      .map((e) => ({ ...e, dateValue: new Date(e.date).getTime() }))
      .filter((e) => Number.isNaN(e.dateValue) || e.dateValue < Date.now())
      .sort((a, b) => a.dateValue - b.dateValue)
  }, [events])

  function setField(field, value) {
    setEventForm((prev) => ({ ...prev, [field]: value }))
    setEventErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validateEvent() {
    const errs = {}
    if (!eventForm.title.trim()) errs.title = 'Title is required.'
    if (!eventForm.date.trim()) errs.date = 'Date is required.'
    if (!eventForm.time.trim()) errs.time = 'Time is required.'
    if (!eventForm.location.trim()) errs.location = 'Location is required.'
    setEventErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleAddEvent(e) {
    e.preventDefault()
    if (!validateEvent()) return
    const next = [
      ...events,
      {
        id: `evt_${Date.now()}`,
        title: eventForm.title.trim(),
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location.trim(),
      },
    ]
    setEvents(next)
    setEventForm({ title: '', date: '', time: '', location: '' })
    setEventErrors({})
    setIsAddingEvent(false)
  }

  function handleRemoveEvent(id) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Dashboard</h1>
          <p className="pageDescription">General overview of student enrollment and upcoming campus events.</p>
        </div>
      </div>

      <div className="dashGrid">
        <div className="dashHero">
          <div className="dashHeroTop">Academic Year Overview</div>
          <div className="dashHeroRow">
            <div>
              <div className="dashHeroTitle">Total Enrolled Students</div>
              <div className="dashHeroSub">Active Records</div>
            </div>
            <div className="dashHeroStat">
              <div className="dashHeroValue">{totalStudents}</div>
            </div>
          </div>
        </div>

        <div className="dashLower">
          <section className="dashPanelNavy">
            <div className="dashPanelHeader">
              <h2 className="dashPanelTitle">Recently Admitted</h2>
            </div>
            <div className="dashList">
              {recentlyAdmitted.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>No admitted students yet.</div>
              ) : (
                recentlyAdmitted.map((student) => {
                  const name = getStudentFullName(student) || 'Unnamed Student'
                  return (
                    <div className="admitRow" key={student.studentID || name + Math.random()}>
                      <div className="avatarCircle">{initialsFromStudent(student)}</div>
                      <div>
                        <div className="admitName">{name}</div>
                        <div className="admitMeta">
                          {student.level || 'Unknown Level'} • {student.programOfStudy || 'Unknown program'}
                        </div>
                      </div>
                      <div className="pill pillVerified">Verified</div>
                    </div>
                  )
                })
              )}
            </div>
          </section>

          <section className="dashPanelNavy">
            <div className="dashPanelHeader">
              <h2 className="dashPanelTitle">Upcoming Activities</h2>
            </div>
            <div className="events">
              {upcomingEvents.length === 0 ? (
                <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px' }}>No upcoming events added yet.</div>
              ) : (
                upcomingEvents.map((event) => (
                  <div className="eventRow" key={event.id}>
                    <div className="dateBox">
                      <div className="dateBoxMonth">{monthName(event.date)}</div>
                      <div className="dateBoxDay">{dayNumber(event.date)}</div>
                    </div>
                    <div>
                      <div className="eventTitle">{event.title}</div>
                      <div className="eventSub">{event.time} • {event.location}</div>
                    </div>
                    <button
                      className="btnGhost"
                      type="button"
                      onClick={() => handleRemoveEvent(event.id)}
                      style={{ marginLeft: 'auto', borderColor: 'rgba(239,68,68,0.4)', color: 'rgba(255,255,255,0.85)' }}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}

              {isAddingEvent ? (
                <form className="form" onSubmit={handleAddEvent}>
                  <div className="formGrid">
                    <label className="field">
                      <span className="fieldLabel">Event Name</span>
                      <input
                        className="input"
                        value={eventForm.title}
                        onChange={(e) => setField('title', e.target.value)}
                        placeholder="Project Presentation"
                      />
                      {eventErrors.title ? <div style={{ color: '#fca5a5', fontSize: '12px' }}>{eventErrors.title}</div> : null}
                    </label>
                    <label className="field">
                      <span className="fieldLabel">Date</span>
                      <input
                        className="input"
                        type="date"
                        value={eventForm.date}
                        onChange={(e) => setField('date', e.target.value)}
                      />
                      {eventErrors.date ? <div style={{ color: '#fca5a5', fontSize: '12px' }}>{eventErrors.date}</div> : null}
                    </label>
                    <label className="field">
                      <span className="fieldLabel">Time</span>
                      <input
                        className="input"
                        type="time"
                        value={eventForm.time}
                        onChange={(e) => setField('time', e.target.value)}
                      />
                      {eventErrors.time ? <div style={{ color: '#fca5a5', fontSize: '12px' }}>{eventErrors.time}</div> : null}
                    </label>
                    <label className="field">
                      <span className="fieldLabel">Location</span>
                      <input
                        className="input"
                        value={eventForm.location}
                        onChange={(e) => setField('location', e.target.value)}
                        placeholder="Conference Hall"
                      />
                      {eventErrors.location ? <div style={{ color: '#fca5a5', fontSize: '12px' }}>{eventErrors.location}</div> : null}
                    </label>
                  </div>

                  <div className="formActions">
                    <button className="btnGhost" type="button" onClick={() => setIsAddingEvent(false)}>
                      Cancel
                    </button>
                    <button className="btnPrimary" type="submit">
                      Save Event
                    </button>
                  </div>
                </form>
              ) : (
                <button className="dashAddEvent" type="button" onClick={() => setIsAddingEvent(true)}>
                  + Add Event
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}

export default Dashboard

