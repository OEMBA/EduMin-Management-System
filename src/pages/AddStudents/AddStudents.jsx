import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadStudents, normalizeStudent, saveStudents } from '../../lib/studentsStorage.jsx'
import { useNotifications } from '../../context/NotificationsContext.jsx'

const REQUIRED_MSG = '*input required*'
const INVALID_EMAIL = 'incorrect format'
const INVALID_STRING = 'string input only'
const INVALID_INTEGER = 'integer values only'
const INVALID_GHANA_PHONE = 'must be in format +233XXXXXXXXX'

function generateUniqueStudentID(existing) {
  const yearPrefix = String(new Date().getFullYear())
  const existingIDs = new Set(existing.map((s) => String(s.studentID ?? '').trim()))

  let maxSequence = 0
  for (const id of existingIDs) {
    if (/^\d{8}$/.test(id) && id.startsWith(yearPrefix)) {
      const seq = Number(id.slice(4))
      if (!Number.isNaN(seq)) {
        maxSequence = Math.max(maxSequence, seq)
      }
    }
  }

  const nextSequence = maxSequence + 1
  return `${yearPrefix}${String(nextSequence).padStart(4, '0')}`
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function isStringInput(value) {
  return /^[a-zA-Z\s'-]*$/.test(value)
}

function isIntegerInput(value) {
  return /^\d*$/.test(value)
}

function normalizeGhanaPhoneInput(value) {
  const digits = String(value ?? '').replace(/\D/g, '')
  if (!digits) return ''

  let localPart = digits
  if (localPart.startsWith('233')) {
    localPart = localPart.slice(3)
  } else if (localPart.startsWith('0')) {
    localPart = localPart.slice(1)
  }

  localPart = localPart.slice(0, 9)
  return `+233${localPart}`
}

function isValidGhanaPhone(value) {
  return /^\+233\d{9}$/.test(String(value ?? '').trim())
}

const initialForm = {
  firstName: '',
  secondName: '',
  otherNames: '',
  gender: '',
  dateOfBirth: '',
  email: '',
  phone: '',
  programOfStudy: '',
  level: '',
  studentID: '',
  guardianName: '',
  guardianContact: '',
  studentRelationship: '',
}

export function AddStudents() {
  const navigate = useNavigate()
  const { addNotification } = useNotifications()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const existing = loadStudents()
    const newID = generateUniqueStudentID(existing)
    setForm((prev) => ({ ...prev, studentID: newID }))
  }, [])

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
      let value = e.target.value

      // Validate string-only fields
      if (['firstName', 'secondName', 'otherNames', 'guardianName'].includes(field)) {
        if (value && !isStringInput(value)) {
          setErrors((prev) => ({ ...prev, [field]: INVALID_STRING }))
          return
        }
        clearError(field)
      }

      if (field === 'phone') {
        value = normalizeGhanaPhoneInput(value)
        setForm((prev) => ({ ...prev, [field]: value }))
        clearError(field)
        return
      }

      // Validate integer-only fields
      if (['guardianContact'].includes(field)) {
        if (value && !isIntegerInput(value)) {
          setErrors((prev) => ({ ...prev, [field]: INVALID_INTEGER }))
          return
        }
        clearError(field)
      }

      setForm((prev) => ({ ...prev, [field]: value }))
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
    check('gender', form.gender)
    check('guardianName', form.guardianName)
    check('guardianContact', form.guardianContact)
    check('studentRelationship', form.studentRelationship)

    // Email format validation
    if (form.email && !isValidEmail(form.email)) {
      nextErrors.email = INVALID_EMAIL
    }

    // String validation for name fields
    if (form.firstName && !isStringInput(form.firstName)) {
      nextErrors.firstName = INVALID_STRING
    }
    if (form.secondName && !isStringInput(form.secondName)) {
      nextErrors.secondName = INVALID_STRING
    }
    if (form.otherNames && !isStringInput(form.otherNames)) {
      nextErrors.otherNames = INVALID_STRING
    }
    if (form.guardianName && !isStringInput(form.guardianName)) {
      nextErrors.guardianName = INVALID_STRING
    }

    // Integer validation for phone fields
    if (form.phone && !isValidGhanaPhone(form.phone)) {
      nextErrors.phone = INVALID_GHANA_PHONE
    }
    if (form.guardianContact && !isIntegerInput(form.guardianContact)) {
      nextErrors.guardianContact = INVALID_INTEGER
    }

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

    const fullName = [normalized.firstName, normalized.otherNames, normalized.secondName].filter(Boolean).join(' ') || 'Unnamed Student'
    addNotification({
      type: 'student-added',
      title: 'Student Added',
      message: `${fullName} was added to the system.`,
      details: `ID: ${normalized.studentID} | Program: ${normalized.programOfStudy || 'N/A'} | Level: ${normalized.level || 'N/A'}`,
    })

    setShowSuccess(true)
  }

  function handleAddAnother() {
    const newID = generateUniqueStudentID(loadStudents())
    setForm({ ...initialForm, studentID: newID })
    setErrors({})
    setShowSuccess(false)
  }

  function handleGoDashboard() {
    setForm(initialForm)
    setErrors({})
    setShowSuccess(false)
    navigate('/dashboard')
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
                placeholder="+233XXXXXXXXX"
                autoComplete="tel"
              />
              {errors.phone ? <span className="addFieldError">{errors.phone}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Gender <span className="addReq">*</span>
              </span>
              <select
                className={`addInput addSelect${errors.gender ? ' addInputError' : ''}`}
                value={form.gender}
                onChange={onChange('gender')}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender ? <span className="addFieldError">{errors.gender}</span> : null}
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
                readOnly
                placeholder="Auto-generated"
                autoComplete="off"
              />
              {errors.studentID ? <span className="addFieldError">{errors.studentID}</span> : null}
            </label>
          </div>

          <h2 className="addSectionHeaderBar">
            <span className="addSectionHeaderIcon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 5h16v14H4V5zm2 2v10h12V7H6zm2 2h8v1.5H8V9zm0 3h6v1.5H8V12z" fill="currentColor" />
              </svg>
            </span>
            Guardian Details
          </h2>

          <div className="addFormGrid3">
            <label className="addField">
              <span className="addFieldLabel">
                Guardian Name <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.guardianName ? ' addInputError' : ''}`}
                value={form.guardianName}
                onChange={onChange('guardianName')}
                placeholder="Guardian Full Name"
                autoComplete="name"
              />
              {errors.guardianName ? <span className="addFieldError">{errors.guardianName}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Guardian Contact <span className="addReq">*</span>
              </span>
              <input
                className={`addInput${errors.guardianContact ? ' addInputError' : ''}`}
                type="tel"
                value={form.guardianContact}
                onChange={onChange('guardianContact')}
                placeholder="Guardian Phone"
                autoComplete="tel"
              />
              {errors.guardianContact ? <span className="addFieldError">{errors.guardianContact}</span> : null}
            </label>

            <label className="addField">
              <span className="addFieldLabel">
                Student Relationship <span className="addReq">*</span>
              </span>
              <select
                className={`addInput addSelect${errors.studentRelationship ? ' addInputError' : ''}`}
                value={form.studentRelationship}
                onChange={onChange('studentRelationship')}
              >
                <option value="">Select relationship</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Sponsor">Sponsor</option>
              </select>
              {errors.studentRelationship ? <span className="addFieldError">{errors.studentRelationship}</span> : null}
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

      {showSuccess && (
        <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Student added successfully">
          <div className="modal">
            <div className="modalHeader">
              <div>
                <div className="modalTitle">Success!</div>
                <div className="modalSubtitle">Student record added successfully</div>
              </div>
            </div>

            <div className="modalBody">
              <p>The student with ID <strong>{form.studentID}</strong> has been added to the database.</p>
            </div>

            <div className="modalActions">
              <button className="btnPrimary" type="button" onClick={handleAddAnother}>
                Add Another Student
              </button>
              <button className="btnGhost" type="button" onClick={handleGoDashboard}>
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
