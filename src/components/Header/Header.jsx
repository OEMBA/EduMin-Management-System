import { useGlobalSearch } from '../../context/SearchContext.jsx'

export function Header() {
  const { query, setQuery } = useGlobalSearch()

  return (
    <header className="header">
      <div className="headerSearch">
        <input
          className="headerSearchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search students, classes, or reports..."
          aria-label="Search"
        />
      </div>

      <button className="headerUser" type="button" aria-label="Admin account">
        <span className="headerUserAvatar" aria-hidden="true" />
        <span className="headerUserLabel">Admin</span>
      </button>
    </header>
  )
}

