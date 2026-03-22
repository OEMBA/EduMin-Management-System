import { createContext, useContext, useMemo, useState } from 'react'

const SearchContext = createContext(null)

export function SearchProvider({ children }) {
  const [query, setQuery] = useState('')
  const value = useMemo(() => ({ query, setQuery }), [query])
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useGlobalSearch() {
  const ctx = useContext(SearchContext)
  if (!ctx) {
    throw new Error('useGlobalSearch must be used within SearchProvider')
  }
  return ctx
}

