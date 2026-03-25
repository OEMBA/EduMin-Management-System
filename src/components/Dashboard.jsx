import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import '../styling/dashboard.css'

function Dashboard() {
    const [students, setStudents] = useState([])
    const [totalStudents, setTotalStudents] = useState(0)
    const [events, setEvents] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const [eventData, setEventData] = useState({
        date: "",
        title: "",
        details: ""
    });

    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem('students')) || []

        const recentStudents = storedStudents.slice(-5).reverse()
        setStudents(recentStudents)
        setTotalStudents(storedStudents.length)
    }, [])

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    }, []);

    const handleEventChange = (e) => {
        const { name, value } = e.target;
        setEventData(prev => ({...prev, [name]: value}));
    };

    const saveEvent = () => {
        if (!eventData.date || !eventData.title) return;
        const updatedEvents = [...events, eventData];
        // sort events by date
        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        setEventData({
            date: "",
            title: "",
            details: ""
        });

        setShowForm(false);
    };

    const deleteEvent = (index) => {
        const updatedEvents = events.filter((_, i) => i !== index);

        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
    };

    const formatDate = (date) => {
        const d = new Date(date);
        const month = d.toLocaleString("default", { month: "short" }).toUpperCase();
        const day = d.getDate();
        return { month, day };
    };

    const cancel = () => {
        setShowForm(false)
    }

    return (
        <section className="dashboard-section">
            <div className="top-section">
                <p>Academic Year Overview</p>

                <div className="enrolled-students">
                    <h2>Total Enrolled Students</h2>

                    <div className="active">
                        <div className="number">
                            <h2>{totalStudents}</h2>
                            <p>ACTIVE RECORDS</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="other-details">
                <div className="recently-admitted">
                    <div className="header">
                        <div className="label">
                            <i className="fa-regular fa-clock"></i>
                            <h5>Recently Admitted</h5>
                        </div>

                        <div className="view-all">
                            <h5><NavLink to="/viewstudent">View All</NavLink></h5>
                        </div>
                    </div>

                    <div className="student-list">
                        {students.length === 0 && <h2>No recent admissions</h2>}
                        {students.map((student) => {
                            // Compute initials inside the function body
                            const names = student.fullName.split(' ').filter(Boolean);
                            const initials =
                                names.length >= 2
                                    ? names[0][0] + names[names.length - 1][0]
                                    : names[0][0];

                            return (
                                <div className="student" key={student.id}>
                                    <div className="naming">
                                        <div className="initials">
                                            <h2>{initials.toUpperCase()}</h2>
                                        </div>
                                        <div className="info">
                                            <div className="name">
                                                <h4>{student.fullName}</h4>
                                            </div>
                                            <div className="program">
                                                <p>{student.level} - {student.program}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="verification">
                                        <div className="check">
                                            <i className='fa-solid fa-check'></i>
                                        </div>
                                        <h5>Verified</h5>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="upcoming">
                    <div className="header">
                        <i className="fa-regular fa-calendar-days"></i>
                        <h5>Upcoming Activities</h5>
                    </div>

                    <div className="events">
                        {events.length === 0 && <p>No upcoming events</p>}

                        {events.map((event, index) => {
                            const { month, day } = formatDate(event.date);
                            return (
                                <div className="event" key={index}>
                                    <div className="date">
                                        <h5>{month}</h5>
                                        <h5>{day}</h5>
                                    </div>
                                    <div className="extras">
                                        <div className="name">
                                            <h5>{event.title}</h5>
                                        </div>
                                        <div className="name">
                                            <p>{event.details}</p>
                                        </div>
                                    </div>
                                    <button className="delete-event" onClick={() => deleteEvent(index)}>
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {showForm && (
                        <form className="event-form">
                            <input type="date" name="date" value={eventData.date} onChange={handleEventChange} />
                            <input type="text" name="title" placeholder="Event Name" value={eventData.title} onChange={handleEventChange} />
                            <input type="text" name="details" placeholder="Time / Location" value={eventData.details} onChange={handleEventChange} />
                            <div className="form-buttons">
                                <button onClick={saveEvent} type='submit'>Save</button>
                                <button onClick={cancel}>Cancel</button>
                            </div>
                        </form>
                    )}

                    <button onClick={() => setShowForm(true)} className='add-event'>Add Event</button>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
