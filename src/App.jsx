import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout/AppLayout.jsx'
import { Dashboard } from './pages/Dashboard/Dashboard.jsx'
import { AddStudents } from './pages/AddStudents/AddStudents.jsx'
import { ViewStudents } from './pages/ViewStudents/ViewStudents.jsx'
import { InstitutionProvider, useInstitution } from './context/InstitutionContext.jsx'
import { Onboarding } from './pages/Onboarding/Onboarding.jsx'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import { AuthState } from './pages/AuthState/AuthState.jsx'

function RequireAppAccess({ children }) {
  const { isAuthenticated } = useAuth()
  const { hasInstitutionProfile } = useInstitution()

  if (!isAuthenticated) return <Navigate to="/auth" replace />
  if (!hasInstitutionProfile) return <Navigate to="/onboard" replace />
  return children
}

function RedirectRoot() {
  const { isAuthenticated } = useAuth()
  const { hasInstitutionProfile } = useInstitution()

  if (isAuthenticated && hasInstitutionProfile) return <Navigate to="/dashboard" replace />
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return <Navigate to="/onboard" replace />
}

function OnboardingEntry({ children }) {
  const { isAuthenticated } = useAuth()
  const { hasInstitutionProfile } = useInstitution()
  if (isAuthenticated && hasInstitutionProfile) return <Navigate to="/dashboard" replace />
  return children
}

function AuthEntry({ children }) {
  const { isAuthenticated } = useAuth()
  const { hasInstitutionProfile } = useInstitution()
  if (isAuthenticated && hasInstitutionProfile) return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <InstitutionProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectRoot />} />
          <Route
            path="/auth"
            element={
              <AuthEntry>
                <AuthState />
              </AuthEntry>
            }
          />
          <Route
            path="/onboard"
            element={
              <OnboardingEntry>
                <Onboarding />
              </OnboardingEntry>
            }
          />

          <Route
            element={
              <RequireAppAccess>
                <AppLayout />
              </RequireAppAccess>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students/add" element={<AddStudents />} />
            <Route path="/students/view" element={<ViewStudents />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </InstitutionProvider>
  )
}

export default App
