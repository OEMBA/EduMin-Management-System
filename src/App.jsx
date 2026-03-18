import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import AddStudent from './components/AddStudent'
import ViewStudent from './components/ViewStudent'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  return (
    <div className='app-container'>
      <Sidebar />
      <main className="main-content">
          <Header />
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
