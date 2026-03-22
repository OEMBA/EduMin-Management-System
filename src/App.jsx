import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/AppLayout.jsx'
import { Dashboard } from './pages/Dashboard/Dashboard.jsx'
import { AddStudents } from './pages/AddStudents/AddStudents.jsx'
import { ViewStudents } from './pages/ViewStudents/ViewStudents.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/students/add" element={<AddStudents />} />
        <Route path="/students/view" element={<ViewStudents />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
