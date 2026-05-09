import React, { useState } from 'react';
import {AuditService} from '../../core/registry';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuditCreate = ({ onCreated, onCancel }) => {
  const [form, setForm] = useState({ officerId: '5', scope: 'PROGRAM', findings: '' });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const err = {};
    if (!form.officerId || String(form.officerId).trim() === '') err.officerId = 'Officer ID is required';
    if (form.findings && form.findings.length > 1000) err.findings = 'Findings max 1000 chars';
    setErrors(err);
    if (Object.keys(err).length) return;

    setSaving(true);
    try {
      const res = await AuditService.create({ officerId: Number(form.officerId), scope: form.scope, findings: form.findings });
    const msg = res?.data?.message || 
            (res?.data?.auditId ? `Audit record ${res.data.auditId} has been successfully initialized.` : 'New audit record created successfully.');
              toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
      onCreated && onCreated();
      if (!onCreated) navigate('/audit/list');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || 'Failed to create audit';
      toast.error(typeof msg === 'string' ? msg : 'Failed to create audit');
    } finally {
      setSaving(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-body">
          <h5>Create Audit</h5>
          <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Officer ID <span className="text-danger">*</span></label>
        <input
          className="form-control"
          inputMode="numeric"
          pattern="\d*"
          value={form.officerId}
          readOnly
          onChange={(e) => setForm({ ...form, officerId: e.target.value.replace(/\D/g, '') })}
          placeholder="Enter Officer ID"
        />
        {errors.officerId && <div className="text-danger small mt-1">{errors.officerId}</div>}
      </div>
      <div className="mb-3">
        <label className="form-label">Scope</label>
        <select className="form-select" value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}>
          <option value="PROGRAM">PROGRAM</option>
          <option value="SUBSIDY">SUBSIDY</option>
          <option value="TAX">TAX</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Findings</label>
        <textarea maxLength={1000} className="form-control" rows={4} value={form.findings} onChange={(e) => setForm({ ...form, findings: e.target.value })} />
        <div className="text-muted small mt-1">{String(form.findings || '').length}/1000</div>
        {errors.findings && <div className="text-danger small mt-1">{errors.findings}</div>}
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

export default AuditCreate;
