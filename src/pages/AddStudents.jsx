import { useState } from 'react'
import { useStudents } from '../context/StudentContext'
import './AddStudents.css'

export default function AddStudents() {
  const { addStudent } = useStudents()
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    subject: '',
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validation
    if (!formData.name.trim() || !formData.grade.trim() || !formData.subject.trim()) {
      alert('Please fill in all fields')
      return
    }

    // Add student
    addStudent(formData)
    
    // Show success message
    setSuccessMessage(`Student "${formData.name}" added successfully!`)
    
    // Reset form
    setFormData({
      name: '',
      grade: '',
      subject: '',
    })

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const grades = [
    '08', '09', '10', '11', '12'
  ]

  const subjects = [
    'General Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'History',
    'Geography',
    'English',
    'Arts',
    'Commerce',
    'Economics',
    'Literature',
  ]

  return (
    <div className="add-students-container">
      <div className="add-students-card">
        <h1>Add New Student</h1>
        
        {successMessage && (
          <div className="success-message">
            ✓ {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label htmlFor="name">Student Name *</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="grade">Grade *</label>
              <select
                id="grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select Grade</option>
                {grades.map((grade) => (
                  <option key={grade} value={grade}>
                    Grade {grade}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">Select Subject</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            Add Student
          </button>
        </form>
      </div>
    </div>
  )
}

