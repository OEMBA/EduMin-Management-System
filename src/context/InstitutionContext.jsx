/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'institutionProfile'
const ACCOUNTS_STORAGE_KEY = 'institutionProfiles'
const ACTIVE_ACCOUNT_KEY = 'activeInstitutionProfileKey'

const defaultProfile = {
  accountKey: '',
  institutionName: '',
  address: '',
  adminName: '',
}

const InstitutionContext = createContext(null)

function randomKeySuffix() {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

function createAccountKey(existingAccounts) {
  let next = ''
  const known = new Set(existingAccounts.map((a) => String(a?.accountKey || '').toUpperCase()))

  do {
    next = `EDU-${randomKeySuffix()}`
  } while (known.has(next))

  return next
}

function normalizeProfile(profile) {
  return {
    accountKey: String(profile?.accountKey || '').trim().toUpperCase(),
    institutionName: String(profile?.institutionName || '').trim(),
    address: String(profile?.address || '').trim(),
    adminName: String(profile?.adminName || '').trim(),
  }
}

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map(normalizeProfile).filter((item) => item.accountKey)
  } catch {
    return []
  }
}

function persistAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts))
}

function loadProfile() {
  const accounts = loadAccounts()
  const activeKey = String(localStorage.getItem(ACTIVE_ACCOUNT_KEY) || '').trim().toUpperCase()

  if (activeKey) {
    const existing = accounts.find((item) => item.accountKey === activeKey)
    if (existing) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
      return existing
    }
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultProfile
    const parsed = normalizeProfile(JSON.parse(raw))
    if (!parsed.institutionName || !parsed.address || !parsed.adminName) return defaultProfile

    const migrated = {
      ...parsed,
      accountKey: parsed.accountKey || createAccountKey(accounts),
    }

    const nextAccounts = [...accounts.filter((item) => item.accountKey !== migrated.accountKey), migrated]
    persistAccounts(nextAccounts)
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, migrated.accountKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
    return migrated
  } catch {
    return defaultProfile
  }
}

export function InstitutionProvider({ children }) {
  const [institution, setInstitutionState] = useState(loadProfile)

  function setInstitution(nextValue) {
    const accounts = loadAccounts()
    const base = normalizeProfile(nextValue)
    const accountKey = base.accountKey || createAccountKey(accounts)
    const normalized = { ...base, accountKey }

    const nextAccounts = [...accounts.filter((item) => item.accountKey !== accountKey), normalized]
    persistAccounts(nextAccounts)

    setInstitutionState(normalized)
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, accountKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  }

  function clearInstitution() {
    setInstitutionState(defaultProfile)
    localStorage.removeItem(ACTIVE_ACCOUNT_KEY)
    localStorage.removeItem(STORAGE_KEY)
  }

  function loginWithKey(rawKey) {
    const targetKey = String(rawKey || '').trim().toUpperCase()
    if (!targetKey) return false

    const accounts = loadAccounts()
    const matched = accounts.find((item) => item.accountKey === targetKey)
    if (!matched) return false

    setInstitutionState(matched)
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, matched.accountKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(matched))
    return true
  }

  const hasStoredAccounts = useMemo(() => loadAccounts().length > 0, [institution])

  const hasInstitutionProfile =
    Boolean(institution.accountKey) && Boolean(institution.institutionName) && Boolean(institution.address) && Boolean(institution.adminName)

  const value = useMemo(
    () => ({ institution, setInstitution, clearInstitution, loginWithKey, hasStoredAccounts, hasInstitutionProfile }),
    [institution, hasStoredAccounts, hasInstitutionProfile],
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
