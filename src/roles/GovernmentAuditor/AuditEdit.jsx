import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EmptyState, Loader } from '../../core/registry';
import useAudits from '../../hooks/roles/useAudits';
import { update } from '../../axios/roles/auditApi';

const AuditEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [form, setForm] = useState({ status: 'PENDING', findings: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const auditsHook = useAudits();
  const { selected, loading: hookLoading, error: hookError, loadById } = auditsHook;

  useEffect(() => {
    if (id) loadById(id);
  }, [id, loadById]);

  useEffect(() => {
    if (selected) {
      setAudit(selected);
      setForm({ status: selected.status || 'PENDING', findings: selected.findings || '' });
      setErrors({});
    } else if (hookError) {
      setAudit(null);
      setErrors((e) => ({ ...e, fetch: hookError }));
    }
  }, [selected, hookError]);

  const validate = () => {
    const err = {};
    if (!form.status || String(form.status).trim() === '') err.status = 'Status is required';
    if (form.findings && form.findings.length > 1000) err.findings = 'Findings max 1000 chars';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await update(id, { status: form.status, findings: form.findings });
      const msg = res?.message || (res?.auditId ? `Updated: ${res.auditId}` : 'Audit updated');
      toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
      navigate('/audit/list');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.msg || 'Update failed';
      console.log(errorMsg);
      
      toast.error(errorMsg || 'Update failed');
    }
  };

  if (hookLoading) return <Loader message="Loading audit..." />;
  if (!audit) {
    const fetchMsg = errors.fetch || hookError || '';
    return <EmptyState title={fetchMsg.toLowerCase().includes('not found') ? 'Audit Not Found' : 'No audit'} message={fetchMsg || 'The requested audit could not be loaded.'} />;
  }

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-body">
          <h5>Edit Audit #{audit.auditId}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Findings</label>
              <textarea
                maxLength={1000}
                className="form-control"
                value={form.findings}
                onChange={(e) => setForm({ ...form, findings: e.target.value })}
              />
              <div className="text-muted small mt-1">{String(form.findings || '').length}/1000</div>
              {errors.findings && <div className="text-danger small mt-1">{errors.findings}</div>}
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditEdit;
