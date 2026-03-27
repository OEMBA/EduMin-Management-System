import { useEffect, useMemo, useState } from 'react'
import { useGlobalSearch } from '../../context/SearchContext.jsx'
import { getStudentFullName, loadStudents, normalizeStudent, saveStudents } from '../../lib/studentsStorage.jsx'

function initialsFromStudent(student) {
  const s = normalizeStudent(student)
  const a = (s.firstName?.[0] || '').toUpperCase()
  const b = (s.secondName?.[0] || '').toUpperCase()
  const both = `${a}${b}`.trim()
  return both || 'ST'
}

function matchesQuery(student, query) {
  if (!query) return true
  const s = normalizeStudent(student)
  const q = query.toLowerCase().trim()
  if (!q) return true

  return (
    s.studentID.toLowerCase().includes(q) ||
    s.firstName.toLowerCase().includes(q) ||
    s.secondName.toLowerCase().includes(q) ||
    s.otherNames.toLowerCase().includes(q) ||
    s.programOfStudy.toLowerCase().includes(q)
  )
}

function EditStudentModal({ student, onClose, onSave }) {
  const [form, setForm] = useState(() => normalizeStudent(student))

  useEffect(() => {
    setForm(normalizeStudent(student))
  }, [student])

  function onChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    onSave(normalizeStudent(form))
  }

  if (!student) return null
  const s = normalizeStudent(student)

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Edit student">
      <div className="modal">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">Edit Student</div>
            <div className="modalSubtitle">{s.studentID}</div>
          </div>
          <button className="iconBtn" type="button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="form" onSubmit={submit}>
          <div className="formGrid">
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
              <input className="input" value={form.level} onChange={onChange('level')} placeholder="Undergraduate" />
            </label>

            <label className="field">
              <span className="fieldLabel">Program</span>
              <input className="input" value={form.programOfStudy} onChange={onChange('programOfStudy')} placeholder="Computer Science" />
            </label>
          </div>

          <div className="modalActions">
            <button className="btnGhost" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btnPrimary" type="submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function DeleteConfirmModal({ student, onCancel, onConfirm }) {
  if (!student) return null
  const s = normalizeStudent(student)
  const name = getStudentFullName(student)

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Delete student record">
      <div className="modal">
        <div className="modalHeader">
          <div>
            <div className="modalTitle">Delete Student Record</div>
            <div className="modalSubtitle">
              {s.studentID} {name ? `• ${name}` : ''}
            </div>
          </div>
          <button className="iconBtn" type="button" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>

        <div className="modalBody">
          <p className="dangerText">
            Are you sure you want to delete this student record? This action cannot be undone.
          </p>
        </div>

        <div className="modalActions">
          <button className="btnGhost" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="btnDanger" type="button" onClick={() => onConfirm(s.studentID)}>
            Delete Record
          </button>
        </div>
      </div>
    </div>
  )
}

export function ViewStudents() {
  const { query } = useGlobalSearch()
  const [students, setStudents] = useState([])
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [page, setPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    setStudents(loadStudents())
  }, [])

  const filtered = useMemo(() => students.filter((s) => matchesQuery(s, query)), [students, query])
  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)

  useEffect(() => {
    if (page !== safePage) setPage(safePage)
  }, [page, safePage])

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, safePage])

  const rangeText = useMemo(() => `Showing ${paged.length} of ${total} students`, [paged.length, total])

  function exportPlaceholder() {
    alert('Export Data is a placeholder for now.')
  }

  function saveEdit(updated) {
    const next = students.map((s) => (normalizeStudent(s).studentID === updated.studentID ? updated : s))
    setStudents(next)
    saveStudents(next)
    setEditing(null)
  }

  function confirmDelete(studentID) {
    const next = students.filter((s) => normalizeStudent(s).studentID !== studentID)
    setStudents(next)
    saveStudents(next)
    setDeleting(null)
  }

  const pageButtons = useMemo(() => {
    const maxButtons = 5
    const tp = totalPages
    const current = safePage
    if (tp <= maxButtons) return Array.from({ length: tp }, (_, i) => i + 1)
    const half = Math.floor(maxButtons / 2)
    let start = Math.max(1, current - half)
    let end = Math.min(tp, start + maxButtons - 1)
    start = Math.max(1, end - maxButtons + 1)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [safePage, totalPages])

  return (
    <section className="page">
      <div className="pageHeader">
        <div>
          <h1 className="pageTitle">View Student</h1>
          <p className="pageDescription">Manage and monitor student enrollment across all department</p>
        </div>

        <button className="vsExportBtn" type="button" onClick={exportPlaceholder}>
          Export Data
        </button>
      </div>

      <div className="vsPanel">
        <div className="vsTableCard">
          <div className="vsTableHeader">
            <div>Student ID</div>
            <div>Full Name</div>
            <div>Level</div>
            <div>Program</div>
            <div className="vsActionsHeader">Actions</div>
          </div>

        {total === 0 ? (
          <div className="vsEmpty">No student records found.</div>
        ) : (
          <div className="vsRows">
            {paged.map((student) => {
              const s = normalizeStudent(student)
              const fullName = getStudentFullName(student) || '—'
              const level = s.level || '—'
              const program = s.programOfStudy || '—'
              return (
                <div className="vsRow" key={s.studentID || fullName}>
                  <div className="vsCell mono">{s.studentID || '—'}</div>

                  <div className="vsCell">
                    <div className="vsNameCell">
                      <div className="vsAvatar">{initialsFromStudent(student)}</div>
                      <div className="vsName">{fullName}</div>
                    </div>
                  </div>

                  <div className="vsCell">
                    <span className="vsLevelPill">{level}</span>
                  </div>

                  <div className="vsCell">{program}</div>

                  <div className="vsCell vsActions">
                    <button className="vsIconBtn" type="button" onClick={() => setEditing(student)} aria-label="Edit">
                      ✎
                    </button>
                    <button className="vsIconBtn" type="button" onClick={() => setDeleting(student)} aria-label="Delete">
                      🗑
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

          <div className="vsFooter">
            <div className="vsRange">{rangeText}</div>

            <div className="vsPager">
              <button
                className="vsPageBtn vsPageBtnGhost"
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
              >
                Previous
              </button>

              <div className="vsPageNums" aria-label="Pagination">
                {pageButtons.map((p) => (
                  <button
                    key={p}
                    className={`vsPageNum${p === safePage ? ' isActive' : ''}`}
                    type="button"
                    onClick={() => setPage(p)}
                    aria-current={p === safePage ? 'page' : undefined}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                className="vsPageBtn vsPageBtnGhost"
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditStudentModal student={editing} onClose={() => setEditing(null)} onSave={saveEdit} />
      <DeleteConfirmModal student={deleting} onCancel={() => setDeleting(null)} onConfirm={confirmDelete} />
    </section>
  )
}

