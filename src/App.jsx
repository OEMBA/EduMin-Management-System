import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/AppLayout.jsx'
import { Dashboard } from './pages/Dashboard/Dashboard.jsx'
import { AddStudents } from './pages/AddStudents/AddStudents.jsx'
import { ViewStudents } from './pages/ViewStudents/ViewStudents.jsx'
import { InstitutionProvider, useInstitution } from './context/InstitutionContext.jsx'
import { Landing } from './pages/Landing/Landing.jsx'
import { Onboarding } from './pages/Onboarding/Onboarding.jsx'

function RequireInstitutionProfile({ children }) {
  const { hasInstitutionProfile } = useInstitution()
  if (!hasInstitutionProfile) return <Navigate to="/onboard" replace />
  return children
}

function RedirectIfOnboarded({ children }) {
  const { hasInstitutionProfile } = useInstitution()
  if (hasInstitutionProfile) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <InstitutionProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RedirectIfOnboarded>
              <Landing />
            </RedirectIfOnboarded>
          }
        />
        <Route
          path="/onboard"
          element={
            <RedirectIfOnboarded>
              <Onboarding />
            </RedirectIfOnboarded>
          }
        />

        <Route
          element={
            <RequireInstitutionProfile>
              <AppLayout />
            </RequireInstitutionProfile>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students/add" element={<AddStudents />} />
          <Route path="/students/view" element={<ViewStudents />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </InstitutionProvider>
  )
}

export default App
