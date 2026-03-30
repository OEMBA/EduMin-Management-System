import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useInstitution } from '../../context/InstitutionContext.jsx'

export function AuthState() {
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const { loginWithKey, hasStoredAccounts, clearInstitution } = useInstitution()
  const [accountKey, setAccountKey] = useState('')
  const [error, setError] = useState('')

  function handleLogin() {
    const success = loginWithKey(accountKey)
    if (!success) {
      setError('Invalid account key. Please check and try again, or sign up to create a new account.')
      return
    }

    setError('')
    login()
    navigate('/dashboard', { replace: true })
  }

  function handleSignUp() {
    clearInstitution()
    logout()
    navigate('/onboard', { replace: true })
  }

  return (
    <section className="authStatePage">
      <div className="authStateCard">
        <h1>You are logged out</h1>
        <p>Use your account key to log in, or sign up to create a different institution profile.</p>

        <div className="authStateHint">
          {hasStoredAccounts
            ? 'Enter your account key (example: EDU-ABC123) to restore your account.'
            : 'No saved account found yet. Choose Sign up to create your first account.'}
        </div>

        <div className="authStateField">
          <label htmlFor="accountKey">Account Key</label>
          <input
            id="accountKey"
            className="authStateInput"
            value={accountKey}
            onChange={(e) => {
              setAccountKey(e.target.value.toUpperCase())
              if (error) setError('')
            }}
            placeholder="EDU-ABC123"
            autoComplete="off"
          />
          {error ? <div className="authStateError">{error}</div> : null}
        </div>

        <div className="authStateActions">
          <button className="btnPrimary" type="button" onClick={handleLogin} disabled={!accountKey.trim()}>
            Login
          </button>
          <button className="btnGhost" type="button" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
    </section>
  )
}
