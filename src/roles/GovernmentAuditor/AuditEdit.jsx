import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuditService } from '../../core/registry';

const AuditEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [form, setForm] = useState({ status: 'PENDING', findings: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { if (id) fetchAudit(id); }, [id]);

  const fetchAudit = async (aid) => {
    setLoading(true);
    try {
      const res = await AuditService.getById(aid);
      setAudit(res.data);
      setForm({ status: res.data.status || 'PENDING', findings: res.data.findings || '' });
    } catch (err) {
      console.error(err);
      if (err?.response?.status === 404) {
        setAudit(null);
        setErrors((e) => ({ ...e, fetch: err.response.data?.message || 'Audit not found' }));
      } else if (err?.request && !err?.response) {
        setAudit(null);
        setErrors((e) => ({ ...e, fetch: 'Network error: Unable to reach server' }));
      } else {
        toast.error(err?.response?.data?.message || 'Failed to load audit');
      }
    } finally { setLoading(false); }
  };

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
      const res = await AuditService.update(id, { status: form.status, findings: form.findings });
      const msg = res?.data?.message || (res?.data && res.data.auditId ? `Updated: ${res.data.auditId}` : 'Audit updated');
      toast.success(typeof msg === 'string' ? msg : JSON.stringify(msg));
      navigate('/audit/list');
    } catch (err) { console.error(err); toast.error(err?.response?.data?.message || 'Update failed'); }
  };

  if (loading) return <div>Loading...</div>;
  if (!audit) return <div>No audit</div>;

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-body">
          <h5>Edit Audit #{audit.auditId}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="PENDING">PENDING</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Findings</label>
              <textarea maxLength={1000} className="form-control" value={form.findings} onChange={(e) => setForm({ ...form, findings: e.target.value })} />
              <div className="text-muted small mt-1">{String(form.findings || '').length}/1000</div>
              {errors.findings && <div className="text-danger small mt-1">{errors.findings}</div>}
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(-1)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuditEdit;
