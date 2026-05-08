import React, { useState, useEffect } from 'react';
import ComplianceService from './ComplianceService';
import { toast } from 'react-toastify';

const ComplianceUpdate = ({ record, onUpdated, onCancel }) => {
  const [form, setForm] = useState({ result: '', notes: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (record) setForm({ result: record.result || 'PENDING', notes: record.notes || '' });
  }, [record]);

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (!record) return;
    setSaving(true);
    try {
      await ComplianceService.update(record.complianceId, { result: form.result, notes: form.notes });
      toast.success('Compliance updated');
      onUpdated && onUpdated();
    } catch (err) {
      console.error('update error', err);
      const msg = err?.response?.data?.message || 'Failed to update compliance';
      toast.error(typeof msg === 'string' ? msg : 'Failed to update compliance');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Result</label>
        <select className="form-select" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })}>
          <option value="PASS">PASS</option>
          <option value="FAIL">FAIL</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="PENDING">PENDING</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Notes</label>
        <textarea maxLength={1000} className="form-control" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
        <div className="text-muted small mt-1">{String(form.notes || '').length}/1000</div>
      </div>
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Update'}</button>
      </div>
    </form>
  );
};

export default ComplianceUpdate;
