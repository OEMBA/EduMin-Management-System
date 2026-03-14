import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import AddStudents from './pages/AddStudents'
import ViewStudents from './pages/ViewStudents'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />
      case 'add-students':
        return <AddStudents />
      case 'view-students':
        return <ViewStudents />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="main-area">
        <TopBar adminName="Admin User" adminRole="Super Admin" />
        <div className="page-content">
          {renderPage()}
        </div>
      </div>
    </div>
  )
}

export default App
