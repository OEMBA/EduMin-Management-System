import { useState, useEffect } from 'react';
import { STUDENT_LEVELS } from '../types/student.js';
import './EditStudentModal.css';

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EditStudentModal = ({ student, onClose, onSave }) => {
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (student) setForm({ ...student });
  }, [student]);

  if (!student || !form) return null;

  const set = (key) => (val) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim())     e.firstName     = 'First name is required';
    if (!form.lastName.trim())      e.lastName      = 'Last name is required';
    if (!form.programOfStudy.trim()) e.programOfStudy = 'Program is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => { if (validate()) onSave(form); };

  const field = (label, key, type = 'text', required = false) => (
    <div className="form-field" key={key}>
      <label className="form-field__label">
        {label} {required && <span className="form-field__required">*</span>}
      </label>
      <input
        type={type}
        className="form-field__input"
        value={String(form[key] ?? '')}
        onChange={e => set(key)(e.target.value)}
      />
      {errors[key] && <span className="form-field__error">{errors[key]}</span>}
    </div>
  );

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="edit-modal">

        {/* Header */}
        <div className="edit-modal__header">
          <div>
            <h2 className="edit-modal__title">Edit Student Record</h2>
            <p className="edit-modal__subtitle">
              Update the details for {form.firstName} {form.lastName}
            </p>
          </div>
          <button className="edit-modal__close" onClick={onClose}><CloseIcon /></button>
        </div>

        {/* ID chip */}
        <div className="edit-modal__id-wrap">
          <div className="edit-modal__id-chip">
            <span className="edit-modal__id-label">Student ID</span>
            <span className="edit-modal__id-value">{form.studentID}</span>
          </div>
        </div>

        {/* Form */}
        <div className="edit-modal__form">
          {field('First Name',          'firstName',     'text', true)}
          {field('Other Names',         'otherNames')}
          {field('Last Name (Surname)', 'lastName',      'text', true)}
          {field('Date of Birth',       'dateOfBirth',   'date')}

          {/* Level select */}
          <div className="form-field">
            <label className="form-field__label">
              Level <span className="form-field__required">*</span>
            </label>
            <select
              className="form-field__select"
              value={form.level}
              onChange={e => set('level')(e.target.value)}
            >
              {STUDENT_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Program */}
          <div className="form-field">
            <label className="form-field__label">
              Program <span className="form-field__required">*</span>
            </label>
            <input
              type="text"
              className="form-field__input"
              value={form.programOfStudy}
              onChange={e => set('programOfStudy')(e.target.value)}
            />
            {errors.programOfStudy && <span className="form-field__error">{errors.programOfStudy}</span>}
          </div>
        </div>

        {/* Footer */}
        <div className="edit-modal__footer">
          <button className="btn btn--cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn--save"   onClick={handleSave}>Save Changes</button>
        </div>

      </div>
    </div>
  );
};

export default EditStudentModal;
