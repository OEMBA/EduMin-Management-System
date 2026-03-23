import { useState } from 'react'
import { useStudents } from '../context/StudentContext'
import './ViewStudents.css'

export default function ViewStudents() {
  const { getAllStudents, deleteStudent, updateStudentStatus } = useStudents()
  const students = getAllStudents()
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const handleDeleteClick = (studentId, studentName) => {
    setDeleteConfirm({ id: studentId, name: studentName })
  }

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      deleteStudent(deleteConfirm.id)
      setDeleteConfirm(null)
    }
  }

  const handleStatusChange = (studentId, newStatus) => {
    updateStudentStatus(studentId, newStatus)
  }

  return (
    <div className="view-students-container">
      <div className="view-students-header">
        <h1>All Students</h1>
        <div className="student-count">
          Total: <strong>{students.length}</strong> students
        </div>
      </div>

      {students.length === 0 ? (
        <div className="empty-state">
          <p>No students added yet.</p>
          <p className="empty-hint">Go to "Add Students" to create a new student record.</p>
        </div>
      ) : (
        <div className="students-table-wrapper">
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className={`student-row status-${student.status}`}>
                  <td className="student-name">{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.subject}</td>
                  <td>
                    <select
                      className={`status-select status-${student.status}`}
                      value={student.status}
                      onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="verified">Verified</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteClick(student.id, student.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteConfirm && (
        <div className="delete-modal-overlay">
          <div className="delete-modal-content">
            <h2>Delete Student?</h2>
            <p>Are you sure you want to delete <strong>"{deleteConfirm.name}"</strong>?</p>
            <p className="delete-warning">This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-btn" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </button>
              <button className="confirm-delete-btn" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

