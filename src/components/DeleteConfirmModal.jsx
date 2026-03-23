import './DeleteConfirmModal.css'

export default function DeleteConfirmModal({ isOpen, eventTitle, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <h2>Delete Event?</h2>
        <p>Are you sure you want to delete <strong>"{eventTitle}"</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
        <div className="delete-modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
