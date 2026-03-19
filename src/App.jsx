import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import ViewStudent from './components/ViewStudent'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className='app-container'>
      <Sidebar isOpen={isSidebarOpen} isClosed={closeSidebar} />
      {isSidebarOpen && <div className="overlay" onClick={closeSidebar} />}
      <main className="main-content">
          <Header onMenuClick={toggleSidebar} />
          <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addstudent" element={<AddStudent />} />
              <Route path="/viewstudent" element={<ViewStudent />} />
          </Routes>
      </main>
    </div>
  )
}

export default App
