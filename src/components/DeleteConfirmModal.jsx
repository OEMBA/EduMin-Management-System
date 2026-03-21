import './DeleteConfirmModal.css';

const WarningIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const DeleteConfirmModal = ({ student, onClose, onConfirm }) => {
  if (!student) return null;

  const fullName = `${student.firstName}${student.otherNames ? ' ' + student.otherNames : ''} ${student.lastName}`.trim();

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="delete-modal">

        {/* Red accent bar */}
        <div className="delete-modal__accent-bar" />

        {/* Body */}
        <div className="delete-modal__body">
          <div className="delete-modal__icon-circle"><WarningIcon /></div>

          <div>
            <h2 className="delete-modal__title">Delete Student Record</h2>
            <p className="delete-modal__message">
              Are you sure you want to delete the record for{' '}
              <span className="delete-modal__student-name">{fullName}</span>{' '}
              (<span className="delete-modal__student-id">{student.studentID}</span>)?
              <br />
              <span className="delete-modal__warning">This action cannot be undone.</span>
            </p>
          </div>

          {/* Student chip */}
          <div className="delete-modal__chip">
            <div className="delete-modal__chip-avatar">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div className="delete-modal__chip-info">
              <p className="delete-modal__chip-name">{fullName}</p>
              <p className="delete-modal__chip-meta">{student.studentID} · {student.programOfStudy}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="delete-modal__footer">
          <button className="btn--cancel-delete" onClick={onClose}>Cancel</button>
          <button className="btn--delete"        onClick={onConfirm}>Delete Record</button>
        </div>

      </div>
    </div>
  );
};

export default DeleteConfirmModal;
