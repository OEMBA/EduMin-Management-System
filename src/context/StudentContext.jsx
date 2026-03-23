import { createContext, useState, useContext, useEffect } from 'react'

const StudentContext = createContext()

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([])

  // Load students from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('students')
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents))
      } catch (error) {
        console.error('Error loading students from localStorage:', error)
      }
    }
  }, [])

  // Save students to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const addStudent = (studentData) => {
    const newStudent = {
      id: Date.now(), // Simple unique ID
      ...studentData,
      status: 'pending',
    }
    setStudents([...students, newStudent])
    return newStudent
  }

  const deleteStudent = (studentId) => {
    setStudents(students.filter(student => student.id !== studentId))
  }

  const updateStudent = (studentId, updatedData) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, ...updatedData } : student
    ))
  }

  const updateStudentStatus = (studentId, status) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, status } : student
    ))
  }

  const getStudentCount = () => {
    return students.length
  }

  const getRecentStudents = (count = 5) => {
    return students.slice(0, count)
  }

  const getAllStudents = () => {
    return students
  }

  const value = {
    students,
    addStudent,
    deleteStudent,
    updateStudent,
    updateStudentStatus,
    getStudentCount,
    getRecentStudents,
    getAllStudents,
  }

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  )
}

export function useStudents() {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider')
  }
  return context
}
