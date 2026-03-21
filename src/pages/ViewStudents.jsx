import { useState, useEffect, useMemo } from 'react';
import { useStudents } from '../utils/StudentContext.jsx';
import LevelBadge from '../components/LevelBadge.jsx';
import EditStudentModal from '../components/EditStudentModal.jsx';
import DeleteConfirmModal from '../components/DeleteConfirmModal.jsx';
import './ViewStudents.css';

const ROWS_PER_PAGE = 5;

// Icon Components
const EditIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" /><path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const ExportIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EmptyIcon = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const avatarColors = [
  { bg: '#1A2F5E', text: '#FFFFFF' },
  { bg: '#2B4EAF', text: '#FFFFFF' },
  { bg: '#0D1B3E', text: '#2D9CDB' },
  { bg: '#27AE60', text: '#FFFFFF' },
  { bg: '#F39C12', text: '#FFFFFF' },
  { bg: '#2D9CDB', text: '#FFFFFF' },
];

const getAvatarColor = (id) => {
  let sum = 0;
  for (const c of id) sum += c.charCodeAt(0);
  return avatarColors[sum % avatarColors.length];
};

const ViewStudents = ({ searchQuery }) => {
  const { students, updateStudent, deleteStudent } = useStudents();
  
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => { setCurrentPage(1); }, [searchQuery]);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(null), 2800);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const q = searchQuery.toLowerCase();
    return students.filter(s =>
      s.studentID.toLowerCase().includes(q) ||
      s.firstName.toLowerCase().includes(q) ||
      s.lastName.toLowerCase().includes(q) ||
      (s.otherNames || '').toLowerCase().includes(q) ||
      s.programOfStudy.toLowerCase().includes(q)
    );
  }, [students, searchQuery]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage    = Math.min(currentPage, totalPages);
  const pageStart   = (safePage - 1) * ROWS_PER_PAGE;
  const pageEnd     = Math.min(pageStart + ROWS_PER_PAGE, filtered.length);
  const pageStudents = filtered.slice(pageStart, pageEnd);

  const pageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (safePage <= 3)   return [1, 2, 3, 4, 5];
    if (safePage >= totalPages - 2)
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages].filter(n => n > 0);
    return [safePage - 2, safePage - 1, safePage, safePage + 1, safePage + 2];
  };

  const handleSaveEdit = (updated) => {
    updateStudent(updated.studentID, updated);
    setEditTarget(null);
    setSuccessMsg(`${updated.firstName} ${updated.lastName}'s record updated successfully.`);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const name = `${deleteTarget.firstName} ${deleteTarget.lastName}`;
    deleteStudent(deleteTarget.studentID);
    setDeleteTarget(null);
    setSuccessMsg(`Record for ${name} has been deleted.`);
  };

  const handleExport = () => {
    const headers = ['Student ID', 'First Name', 'Other Names', 'Last Name', 'Date of Birth', 'Level', 'Program'];
    const rows = students.map(s => [s.studentID, s.firstName, s.otherNames, s.lastName, s.dateOfBirth, s.level, s.programOfStudy]);
    const csv  = [headers, ...rows].map(r => r.map(c => `"${c ?? ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'students_export.csv'; a.click();
    URL.revokeObjectURL(url);
    setSuccessMsg('Student data exported successfully!');
  };

  return (
    <div className="view-students">

      {/* Toast */}
      {successMsg && (
        <div className="toast">
          <CheckIcon />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="view-students__page-header">
        <div>
          <h1 className="view-students__title">View Students</h1>
          <p className="view-students__desc">Manage and monitor student enrollment across all departments.</p>
        </div>
        <button className="btn--export" onClick={handleExport}>
          <ExportIcon /> Export Data
        </button>
      </div>

      {/* Table Card */}
      <div className="table-card">

        {/* Table Head */}
        <div className="table-head">
          <span className="table-head__cell">Student ID</span>
          <span className="table-head__cell">Full Name</span>
          <span className="table-head__cell">Level</span>
          <span className="table-head__cell">Program</span>
          <span className="table-head__cell table-head__cell--center">Actions</span>
        </div>

        {/* Table Body */}
        <div className="table-body">
          {filtered.length === 0 ? (
            <div className="table-empty">
              <EmptyIcon />
              <div>
                <p className="table-empty__title">
                  {searchQuery ? 'No matching students found.' : 'No student records found.'}
                </p>
                {searchQuery && <p className="table-empty__sub">Try a different search term.</p>}
              </div>
            </div>
          ) : (
            pageStudents.map((student) => {
              const fullName     = `${student.firstName}${student.otherNames ? ' ' + student.otherNames : ''} ${student.lastName}`;
              const initials     = `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
              const avatarColor  = getAvatarColor(student.studentID);

              return (
                <div key={student.studentID} className="table-row">
                  {/* ID */}
                  <span className="table-row__id">{student.studentID}</span>

                  {/* Full Name */}
                  <div className="table-row__name-cell">
                    <div
                      className="table-row__avatar"
                      style={{ backgroundColor: avatarColor.bg, color: avatarColor.text }}
                    >
                      {initials}
                    </div>
                    <span className="table-row__name">{fullName}</span>
                  </div>

                  {/* Level */}
                  <div><LevelBadge level={student.level} /></div>

                  {/* Program */}
                  <span className="table-row__program">{student.programOfStudy}</span>

                  {/* Actions */}
                  <div className="table-row__actions">
                    <button
                      className="action-btn action-btn--edit"
                      title="Edit student"
                      onClick={() => setEditTarget(student)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="action-btn action-btn--delete"
                      title="Delete student"
                      onClick={() => setDeleteTarget(student)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        {filtered.length > 0 && (
          <div className="table-footer">
            <p className="table-footer__count">
              Showing <strong>{pageStart + 1}</strong> to <strong>{pageEnd}</strong> of{' '}
              <strong>{filtered.length.toLocaleString()}</strong>{' '}
              {filtered.length !== students.length
                ? `result${filtered.length !== 1 ? 's' : ''} (filtered from ${students.length.toLocaleString()} total)`
                : `student${filtered.length !== 1 ? 's' : ''}`}
            </p>

            <div className="pagination">
              <button
                className="pagination__btn"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
              >
                <ChevronLeft /> Prev
              </button>

              {pageNumbers().map(n => (
                <button
                  key={n}
                  className={`pagination__page${n === safePage ? ' pagination__page--active' : ''}`}
                  onClick={() => setCurrentPage(n)}
                >
                  {n}
                </button>
              ))}

              <button
                className="pagination__btn"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
              >
                Next <ChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <EditStudentModal
        student={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSaveEdit}
      />
      <DeleteConfirmModal
        student={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ViewStudents;