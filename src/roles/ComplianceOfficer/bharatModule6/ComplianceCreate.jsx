import React, { useState } from 'react';
import {ComplianceService} from '../../../core/registry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ComplianceCreate = ({ onCreated, onCancel }) => {
    const [form, setForm] = useState({ entityId: '', referenceId: '', type: 'TAX', notes: '' });
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e && e.preventDefault();
        // client-side validation
        const err = {};
        if (!form.entityId || String(form.entityId).trim() === '') err.entityId = 'Entity ID is required';
        if (!form.referenceId || String(form.referenceId).trim() === '') err.referenceId = 'Reference ID is required';
        if (form.notes && form.notes.length > 1000) err.notes = 'Notes max 1000 chars';
        setErrors(err);
        if (Object.keys(err).length) return;

        setSaving(true);
        try {
            const res = await ComplianceService.create({
                entityId: Number(form.entityId),
                referenceId: Number(form.referenceId),
                type: form.type,
                notes: form.notes,
            });
            const msg = res?.data?.message ||
                (res?.data?.complianceId ? `Compliance record ${res.data.complianceId} successfully created.` : 'Compliance record created successfully.');
            toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
            onCreated && onCreated();
            if (!onCreated) navigate('/compliance/list');
        } catch (err) {
            console.error('create error', err);
            const msg = err?.response?.data?.message || 'Failed to create compliance';
            toast.error(typeof msg === 'string' ? msg : 'Failed to create compliance');
        } finally {
            setSaving(false);
        }
    };

    const navigate = useNavigate();

    return (
        <div className="container py-3">
            <div className="card">
                <div className="card-body">
                    <h5>Create Compliance</h5>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Entity ID <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                inputMode="numeric"
                                pattern="\d*"
                                value={form.entityId}
                                onChange={(e) => setForm({ ...form, entityId: e.target.value.replace(/\D/g, '') })}
                                placeholder="Enter Entity ID"
                            />
                            {errors.entityId && <div className="text-danger small mt-1">{errors.entityId}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Reference ID <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                inputMode="numeric"
                                pattern="\d*"
                                value={form.referenceId}
                                onChange={(e) => setForm({ ...form, referenceId: e.target.value.replace(/\D/g, '') })}
                                placeholder="Enter Reference ID"
                            />
                            {errors.referenceId && <div className="text-danger small mt-1">{errors.referenceId}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type</label>
                            <select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                <option value="TAX">TAX</option>
                                <option value="SUBSIDY">SUBSIDY</option>
                                <option value="PROGRAM">PROGRAM</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Notes</label>
                            <textarea maxLength={1000} className="form-control" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                            <div className="text-muted small mt-1">{String(form.notes || '').length}/1000</div>
                            {errors.notes && <div className="text-danger small mt-1">{errors.notes}</div>}
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-secondary me-2" onClick={() => (onCancel ? onCancel() : navigate(-1))}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Create'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ComplianceCreate;
