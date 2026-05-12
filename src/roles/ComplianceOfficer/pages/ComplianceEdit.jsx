import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EmptyState, Loader ,useCompliance} from '../../../core/registry';
import { useDispatch } from 'react-redux';
import { updateComplianceRecord } from '../../../redux/complianceOfficerSlice';

const ComplianceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [record, setRecord] = useState(null);
  const [form, setForm] = useState({ result: 'PENDING', notes: '' });
  const [errors, setErrors] = useState({});

  const complianceHook = useCompliance();
  const { selected, loading: hookLoading, error: hookError, loadById } = complianceHook;

  useEffect(() => {
    if (id) loadById(id);
  }, [id, loadById]);

  useEffect(() => {
    if (selected) {
      setRecord(selected);
      setForm({ result: selected.result || 'PENDING', notes: selected.notes || '' });
      setErrors({});
    } else if (hookError) {
      setRecord(null);
      setErrors((e) => ({ ...e, fetch: hookError }));
    }
  }, [selected, hookError]);

  const validate = () => {
    const err = {};
    if (!form.result || String(form.result).trim() === '') err.result = 'Result is required';
    if (form.notes && form.notes.length > 1000) err.notes = 'Notes max 1000 chars';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await dispatch(updateComplianceRecord({ id, ...form })).unwrap();
      toast.success('Compliance record updated successfully.');
      navigate('/compliance/list');
    } catch (err) {
      toast.error(err || 'Update failed');
    }
  };

  if (hookLoading) return <Loader />;
  if (!record) {
    const fetchMsg = errors.fetch || hookError || '';
    return (
      <EmptyState
        title={fetchMsg.toLowerCase().includes('not found') ? 'Record Not Found' : 'No record'}
        message={fetchMsg || 'The requested record could not be loaded.'}
      />
    );
  }

  return (
    <div className="container py-3">
      <div className="card">
        <div className="card-body">
          <h5>Edit Compliance #{record.complianceId}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Result</label>
              <select
                className="form-select"
                value={form.result}
                onChange={(e) => setForm({ ...form, result: e.target.value })}
              >
                <option value="PASS">PASS</option>
                <option value="FAIL">FAIL</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Notes</label>
              <textarea
                maxLength={1000}
                className="form-control"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              <div className="text-muted small mt-1">{String(form.notes || '').length}/1000</div>
              {errors.notes && <div className="text-danger small mt-1">{errors.notes}</div>}
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={() => navigate(-1)}
              >
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

export default ComplianceEdit;
