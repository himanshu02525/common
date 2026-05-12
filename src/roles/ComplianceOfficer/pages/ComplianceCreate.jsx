import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createComplianceRecord } from '../../../redux/complianceOfficerSlice';
import { useCharacterLimit } from '../../../core/registry';

const ComplianceCreate = ({ onCreated, onCancel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notesManager = useCharacterLimit('', 1000);

  const [complianceForm, setComplianceForm] = useState({
    entityId: '',
    referenceId: '',
    complianceType: 'TAX',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const getReferenceLabel = () => {
    switch (complianceForm.complianceType) {
      case 'TAX': return 'Tax ID';
      case 'SUBSIDY': return 'Subsidy ID';
      case 'PROGRAM': return 'Program ID';
      default: return 'Reference ID';
    }
  };

  const handleInputChange = (field, value) => {
    setComplianceForm((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    const errors = {};
    if (!complianceForm.entityId.trim()) errors.entityId = 'Entity ID is required';
    if (!complianceForm.referenceId.trim()) {
      errors.referenceId = `${getReferenceLabel()} is required`;
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    try {
      const payload = {
        entityId: Number(complianceForm.entityId),
        referenceId: Number(complianceForm.referenceId),
        type: complianceForm.complianceType,
        notes: notesManager.value,
      };

      await dispatch(createComplianceRecord(payload)).unwrap();
      toast.success('Compliance record created successfully.');

      if (onCreated) {
        onCreated();
      } else {
        navigate('/compliance/list');
      }
    } catch (error) {
      toast.error(error || 'Failed to create compliance record');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Create Compliance Entry</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Entity ID <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${formErrors.entityId ? 'is-invalid' : ''}`}
                inputMode="numeric"
                value={complianceForm.entityId}
                onChange={(e) =>
                  handleInputChange('entityId', e.target.value.replace(/\D/g, ''))
                }
                placeholder="Enter Entity ID"
              />
              {formErrors.entityId && (
                <div className="invalid-feedback">{formErrors.entityId}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Compliance Type</label>
              <select
                className="form-select"
                value={complianceForm.complianceType}
                onChange={(e) => handleInputChange('complianceType', e.target.value)}
              >
                <option value="TAX">TAX</option>
                <option value="SUBSIDY">SUBSIDY</option>
                <option value="PROGRAM">PROGRAM</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">
                {getReferenceLabel()} <span className="text-danger">*</span>
              </label>
              <input
                className={`form-control ${formErrors.referenceId ? 'is-invalid' : ''}`}
                inputMode="numeric"
                value={complianceForm.referenceId}
                onChange={(e) =>
                  handleInputChange('referenceId', e.target.value.replace(/\D/g, ''))
                }
                placeholder={`Enter ${getReferenceLabel()}`}
              />
              {formErrors.referenceId && (
                <div className="invalid-feedback">{formErrors.referenceId}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                rows="3"
                maxLength={1000}
                value={notesManager.value}
                onChange={notesManager.handleChange}
                style={{ resize: 'none' }}
              />
              <div className="d-flex justify-content-end">
                <small className={notesManager.isFull ? 'text-danger fw-bold' : 'text-muted'}>
                  {notesManager.count} / {notesManager.limit} characters
                </small>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => (onCancel ? onCancel() : navigate(-1))}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Create Record'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplianceCreate;