import React, { useState } from 'react';
import { ComplianceService } from '../../../core/registry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ComplianceCreate = ({ onCreated, onCancel }) => {
    const navigate = useNavigate();
    
    // State management with descriptive naming
    const [complianceForm, setComplianceForm] = useState({
        entityId: '',
        referenceId: '',
        complianceType: 'TAX',
        notes: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    // Dynamic label helper to map Type to specific ID names
    const getReferenceLabel = () => {
        switch (complianceForm.complianceType) {
            case 'TAX': return 'Tax ID';
            case 'SUBSIDY': return 'Subsidy ID';
            case 'PROGRAM': return 'Program ID';
            default: return 'Reference ID';
        }
    };

    const handleInputChange = (field, value) => {
        setComplianceForm(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();

        // Validation Logic
        const errors = {};
        const referenceLabel = getReferenceLabel();

        if (!complianceForm.entityId.trim()) {
            errors.entityId = 'Entity ID is required';
        }
        if (!complianceForm.referenceId.trim()) {
            errors.referenceId = `${referenceLabel} is required`;
        }
        if (complianceForm.notes && complianceForm.notes.length > 1000) {
            errors.notes = 'Notes cannot exceed 1000 characters';
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) return;

        setIsSaving(true);
        try {
            const payload = {
                entityId: Number(complianceForm.entityId),
                referenceId: Number(complianceForm.referenceId),
                type: complianceForm.complianceType,
                notes: complianceForm.notes,
            };

            const response = await ComplianceService.create(payload);
            
            const successMessage = response?.data?.message || 
                (response?.data?.complianceId 
                    ? `Compliance record ${response.data.complianceId} created.` 
                    : 'Compliance record created successfully.');

            toast.success(successMessage);
            
            if (onCreated) {
                onCreated();
            } else {
                navigate('/compliance/list');
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to create compliance record';
            toast.error(errorMessage);
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
                        {/* Entity ID Field */}
                        <div className="mb-3">
                            <label className="form-label">Entity ID <span className="text-danger">*</span></label>
                            <input
                                className={`form-control ${formErrors.entityId ? 'is-invalid' : ''}`}
                                inputMode="numeric"
                                value={complianceForm.entityId}
                                onChange={(e) => handleInputChange('entityId', e.target.value.replace(/\D/g, ''))}
                                placeholder="Enter Entity ID"
                            />
                            {formErrors.entityId && <div className="invalid-feedback">{formErrors.entityId}</div>}
                        </div>

                        {/* Compliance Type Dropdown */}
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

                        {/* Dynamic Reference ID Field */}
                        <div className="mb-3">
                            <label className="form-label">
                                {getReferenceLabel()} <span className="text-danger">*</span>
                            </label>
                            <input
                                className={`form-control ${formErrors.referenceId ? 'is-invalid' : ''}`}
                                inputMode="numeric"
                                value={complianceForm.referenceId}
                                onChange={(e) => handleInputChange('referenceId', e.target.value.replace(/\D/g, ''))}
                                placeholder={`Enter ${getReferenceLabel()}`}
                            />
                            {formErrors.referenceId && <div className="invalid-feedback">{formErrors.referenceId}</div>}
                        </div>

                        {/* Notes Field */}
                        <div className="mb-3">
                            <label className="form-label">Notes</label>
                            <textarea 
                                className={`form-control ${formErrors.notes ? 'is-invalid' : ''}`}
                                rows="3"
                                value={complianceForm.notes} 
                                onChange={(e) => handleInputChange('notes', e.target.value)} 
                            />
                            <div className="d-flex justify-content-between">
                                <small className={complianceForm.notes.length > 1000 ? "text-danger" : "text-muted"}>
                                    {complianceForm.notes.length} / 1000 characters
                                </small>
                                {formErrors.notes && <small className="text-danger">{formErrors.notes}</small>}
                            </div>
                        </div>

                        {/* Action Buttons */}
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
                                ) : 'Create Record'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplianceCreate;