import { useMemo, useState } from 'react'
import { loadStudents, normalizeStudent, saveStudents } from '../../lib/studentsStorage.js'

function generateStudentId(existing) {
  const year = new Date().getFullYear()
  const prefix = `STU-${year}-`
  const used = new Set(existing.map((s) => String(s.studentID || '')))
  for (let i = 1; i < 100000; i++) {
    const candidate = `${prefix}${String(i).padStart(3, '0')}`
    if (!used.has(candidate)) return candidate
  }
  return `${prefix}${Date.now()}`
}

export function AddStudents() {
  const [form, setForm] = useState({
    studentID: '',
    firstName: '',
    otherNames: '',
    secondName: '',
    dateOfBirth: '',
    level: 'Undergraduate',
    programOfStudy: 'Computer Science',
  })
  const [status, setStatus] = useState('')

  const levelOptions = useMemo(() => ['Undergraduate', 'Diploma', 'Postgraduate'], [])
  const programOptions = useMemo(
    () => ['Computer Science', 'Information Technology', 'Business Administration', 'Accounting', 'Engineering'],
    [],
  )

  function onChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    const existing = loadStudents()
    const studentID = form.studentID?.trim() || generateStudentId(existing)
    const normalized = normalizeStudent({ ...form, studentID })

    if (!normalized.firstName || !normalized.secondName || !normalized.level || !normalized.programOfStudy) {
      setStatus('Please fill First Name, Second Name, Level, and Program.')
      return
    }

    const next = [...existing.filter((s) => String(s.studentID) !== normalized.studentID), normalized]
    saveStudents(next)
    setStatus(`Saved ${normalized.studentID}.`)
    setForm((p) => ({ ...p, studentID: '' }))
  }

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">Add Students</h1>
          <p className="pageDescription">Register a new student record.</p>
        </div>
      </div>

      <div className="panel">
        <form className="form" onSubmit={onSubmit}>
          <div className="formGrid">
            <label className="field">
              <span className="fieldLabel">Student ID (optional)</span>
              <input className="input" value={form.studentID} onChange={onChange('studentID')} placeholder="STU-2024-001" />
            </label>

            <label className="field">
              <span className="fieldLabel">First Name</span>
              <input className="input" value={form.firstName} onChange={onChange('firstName')} />
            </label>

            <label className="field">
              <span className="fieldLabel">Other Names</span>
              <input className="input" value={form.otherNames} onChange={onChange('otherNames')} />
            </label>

            <label className="field">
              <span className="fieldLabel">Second Name</span>
              <input className="input" value={form.secondName} onChange={onChange('secondName')} />
            </label>

            <label className="field">
              <span className="fieldLabel">Date of Birth</span>
              <input className="input" type="date" value={form.dateOfBirth} onChange={onChange('dateOfBirth')} />
            </label>

            <label className="field">
              <span className="fieldLabel">Level</span>
              <select className="input" value={form.level} onChange={onChange('level')}>
                {levelOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span className="fieldLabel">Program</span>
              <select className="input" value={form.programOfStudy} onChange={onChange('programOfStudy')}>
                {programOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="formActions">
            <button className="btnPrimary" type="submit">
              Save Student
            </button>
            {status ? <div className="formStatus">{status}</div> : null}
          </div>
        </form>
      </div>
    </section>
  )
}

