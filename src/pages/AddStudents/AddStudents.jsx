import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStudents, normalizeStudent, saveStudents } from '../../lib/studentsStorage.js'

const REQUIRED_MSG = '*input required*'

const initialForm = {
  firstName: '',
  secondName: '',
  otherNames: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  programOfStudy: '',
  level: '',
  studentID: '',
}

export function AddStudents() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  const programOptions = useMemo(
    () => [
      'Computer Science',
      'Data Science',
      'Information Technology',
      'Business Administration',
      'Accounting',
      'Engineering',
      'Medicine',
      'Law',
    ],
    [],
  )

  const levelOptions = useMemo(() => ['Undergraduate', 'Graduate', 'Postgraduate', 'Diploma'], [])

  function clearError(field) {
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }

  function onChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      clearError(field)
    }
  }

  function validate() {
    const nextErrors = {}
    const check = (key, value) => {
      if (!String(value ?? '').trim()) nextErrors[key] = REQUIRED_MSG
    }

    check('firstName', form.firstName)
    check('secondName', form.secondName)
    check('dateOfBirth', form.dateOfBirth)
    check('email', form.email)
    check('phone', form.phone)
    check('programOfStudy', form.programOfStudy)
    check('level', form.level)
    check('studentID', form.studentID)

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!validate()) return

    const existing = loadStudents()
    const normalized = normalizeStudent(form)

    const next = [...existing.filter((s) => String(s.studentID) !== normalized.studentID), normalized]
    saveStudents(next)
    setForm(initialForm)
    setErrors({})
    navigate('/students/view')
  }

  function onCancel() {
    setForm(initialForm)
    setErrors({})
  }

  return (
    <section className="page addStudentPage">
      <h1 className="addStudentMainTitle">Add New Student</h1>
      <p className="addStudentMainSubtitle">Enroll a new student into the institutional database.</p>

      <div className="addStudentCard">
        <form className="addStudentForm" onSubmit={onSubmit} noValidate>
          <h2 className="addSectionHeaderBar">
            <span className="addSectionHeaderIcon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 5h16v14H4V5zm2 2v10h12V7H6zm2 2h8v1.5H8V9zm0 3h6v1.5H8V12z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Personal Information
          </h2>

          <div className="addFormGrid3">
            <label className="addField">
              <span className="addFieldLabel">
                First Name <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.firstName ? ' addInputError' : ''}`}
                value={form.firstName}
                onChange={onChange('firstName')}
                placeholder="e.g Samuel"
                autoComplete="given-name"
              />
              {errors.firstName ? <span className="addFieldError">{errors.firstName}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Second Name <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.secondName ? ' addInputError' : ''}`}
                value={form.secondName}
                onChange={onChange('secondName')}
                placeholder="e.g Samuel"
                autoComplete="family-name"
              />
              {errors.secondName ? <span className="addFieldError">{errors.secondName}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">Other Name</span>
              <input
                className="addInput"
                value={form.otherNames}
                onChange={onChange('otherNames')}
                placeholder="e.g Samuel"
              />
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Date of Birth <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.dateOfBirth ? ' addInputError' : ''}`}
                type="date"
                value={form.dateOfBirth}
                onChange={onChange('dateOfBirth')}
              />
              {errors.dateOfBirth ? <span className="addFieldError">{errors.dateOfBirth}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Email <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.email ? ' addInputError' : ''}`}
                type="email"
                value={form.email}
                onChange={onChange('email')}
                placeholder="@gmail.com"
                autoComplete="email"
              />
              {errors.email ? <span className="addFieldError">{errors.email}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Phone number <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.phone ? ' addInputError' : ''}`}
                type="tel"
                value={form.phone}
                onChange={onChange('phone')}
                placeholder="+233"
                autoComplete="tel"
              />
              {errors.phone ? <span className="addFieldError">{errors.phone}</span> : null}
            </label>
          </div>

          <h2 className="addSectionTitleAcademic">
            <span className="addSectionAcademicIcon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 3L2 8l10 5 8-4v7h2V8L12 3zm0 2.18L17.09 8 12 10.82 6.91 8 12 5.18zM4 10v8l8 4 8-4v-8l-8 4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Academic Details
          </h2>

          <div className="addFormGrid3">
            <label className="addField">
              <span className="addFieldLabel">
                Program of Study <span className="addReq">*</span>
              </span>
              <select
                className={`addInput addSelect${errors.programOfStudy ? ' addInputError' : ''}`}
                value={form.programOfStudy}
                onChange={onChange('programOfStudy')}
              >
                <option value="">Choose Your Program</option>
                {programOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.programOfStudy ? <span className="addFieldError">{errors.programOfStudy}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Level <span className="addReq">*</span>
              </span>
              <select
                className={`addInput addSelect${errors.level ? ' addInputError' : ''}`}
                value={form.level}
                onChange={onChange('level')}
              >
                <option value="">Your academic year</option>
                {levelOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.level ? <span className="addFieldError">{errors.level}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Student ID <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.studentID ? ' addInputError' : ''}`}
                value={form.studentID}
                onChange={onChange('studentID')}
                placeholder="Enter your ID"
                autoComplete="off"
              />
              {errors.studentID ? <span className="addFieldError">{errors.studentID}</span> : null}
            </label>
          </div>

          <div className="addFormActionsRow">
            <button className="addBtnSubmit" type="submit">
              Submit Student Record
            </button>
            <button className="addBtnCancel" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
