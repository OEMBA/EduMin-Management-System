/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AUTH_STORAGE_KEY = 'isAuthenticated'
const PROFILE_STORAGE_KEY = 'institutionProfile'

const AuthContext = createContext(null)

function loadAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (raw === 'true') return true
    if (raw === 'false') return false
    return Boolean(localStorage.getItem(PROFILE_STORAGE_KEY))
  } catch {
    return false
  }
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(loadAuthState)

  function login() {
    setIsAuthenticated(true)
    localStorage.setItem(AUTH_STORAGE_KEY, 'true')
  }

  function logout() {
    setIsAuthenticated(false)
    localStorage.setItem(AUTH_STORAGE_KEY, 'false')
  }

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [isAuthenticated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
