import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'edumin_students';

const StudentContext = createContext();

// Helper functions for localStorage
const getStudentsFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveStudentsToStorage = (students) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  // Load students from localStorage on mount
  useEffect(() => {
    const stored = getStudentsFromStorage();
    setStudents(stored); // Just load whatever is in storage (could be empty)
  }, []);

  // Save to localStorage whenever students change
  useEffect(() => {
    saveStudentsToStorage(students);
  }, [students]);

  // Add a new student
  const addStudent = (student) => {
    setStudents(prev => [...prev, student]);
  };

  // Update a student
  const updateStudent = (studentID, updatedData) => {
    setStudents(prev =>
      prev.map(s => s.studentID === studentID ? { ...s, ...updatedData } : s)
    );
  };

  // Delete a student
  const deleteStudent = (studentID) => {
    setStudents(prev => prev.filter(s => s.studentID !== studentID));
  };

  // Replace all students (useful for bulk operations)
  const setAllStudents = (newStudents) => {
    setStudents(newStudents);
    saveStudentsToStorage(newStudents);
  };

  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent,
        setAllStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the context
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};
