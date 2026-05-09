import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAudit } from '../../redux/auditSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuditCreate = () => {
  const [form, setForm] = useState({ officerId: '5', scope: 'PROGRAM', findings: '' });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.audit);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = {};
    if (!form.officerId || String(form.officerId).trim() === '') err.officerId = 'Officer ID is required';
    if (form.findings && form.findings.length > 1000) err.findings = 'Findings max 1000 chars';
    setErrors(err);
    if (Object.keys(err).length) return;

    try {
      await dispatch(createAudit({
        officerId: Number(form.officerId),
        scope: form.scope,
        findings: form.findings,
      })).unwrap();
      toast.success('Audit record created successfully.');
      navigate('/audit/list');
    } catch (err) {
      toast.error(err.message || 'Failed to create audit');
    }
  };

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
                onChange={(e) => setForm({ ...form, officerId: e.target.value })}
              />
              {errors.officerId && <small className="text-danger">{errors.officerId}</small>}
            </div>
            <div className="mb-3">
              <label className="form-label">Scope</label>
              <select
                className="form-select"
                value={form.scope}
                onChange={(e) => setForm({ ...form, scope: e.target.value })}
              >
                <option value="PROGRAM">Program</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Findings</label>
              <textarea
                className="form-control"
                value={form.findings}
                onChange={(e) => setForm({ ...form, findings: e.target.value })}
              />
              {errors.findings && <small className="text-danger">{errors.findings}</small>}
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Create Audit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditCreate;
