/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'institutionProfile'

const defaultProfile = {
  institutionName: '',
  address: '',
  adminName: '',
}

const InstitutionContext = createContext(null)

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProfile
    const parsed = JSON.parse(raw)
    return {
      institutionName: parsed?.institutionName || '',
      address: parsed?.address || '',
      adminName: parsed?.adminName || '',
    }
  } catch {
    return defaultProfile
  }
}

export function InstitutionProvider({ children }) {
  const [institution, setInstitutionState] = useState(loadProfile)

  function setInstitution(nextValue) {
    const normalized = {
      institutionName: nextValue?.institutionName?.trim() || '',
      address: nextValue?.address?.trim() || '',
      adminName: nextValue?.adminName?.trim() || '',
    }

    setInstitutionState(normalized)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  }

  const hasInstitutionProfile =
    Boolean(institution.institutionName) && Boolean(institution.address) && Boolean(institution.adminName)

  const value = useMemo(
    () => ({ institution, setInstitution, hasInstitutionProfile }),
    [institution, hasInstitutionProfile],
  )

  return <InstitutionContext.Provider value={value}>{children}</InstitutionContext.Provider>
}

export function useInstitution() {
  const ctx = useContext(InstitutionContext)
  if (!ctx) {
    throw new Error('useInstitution must be used within InstitutionProvider')
  }
  return ctx
}
