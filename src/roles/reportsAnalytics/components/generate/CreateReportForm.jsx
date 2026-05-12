import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { 
  CharacterAllow, 
  ScopeSelector, 
  BootstrapSwitch, 
  reportApi 
} from '../../../../core/registry';

const FIELD_STYLE = {
  height: '38px',
  fontSize: '0.875rem',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  padding: '0.5rem 0.75rem',
  transition: 'all 0.2s ease',
  backgroundColor: '#ffffff'
};

function useCharacterLimit(initialValue, maxLength) {
  const [value, setValue] = useState(initialValue);
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) setValue(newValue);
  };
  return { value, setValue, handleChange, count: value.length, limit: maxLength };
}

export default function CreateReportForm({ onSuccess }) {
  const [selectedScope, setSelectedScope] = useState('TAX');
  const [reportYear, setReportYear] = useState('');
  const [programId, setProgramId] = useState('');
  const [isToggled, setIsToggled] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const notesManager = useCharacterLimit('', 255);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleScopeChange = (scope) => {
    setSelectedScope(scope);
    setReportYear('');
    setProgramId('');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsGenerating(true);

    try {
      const reportName = notesManager.value.trim();
      let scope = isToggled ? 'OVERALL' : selectedScope;
      let year = (isToggled || selectedScope === 'TAX') ? (reportYear || null) : null;
      let id = (isToggled || selectedScope === 'PROGRAM') ? (programId || null) : null;

      const data = await reportApi.generateReport({
        scope,
        id, 
        year,
        reportName,
      });

      if (typeof onSuccess === 'function') onSuccess(data);
      toast.success('Report generated successfully');
    } catch (err) {
      toast.error('Failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="p-4 rounded-4 mx-auto" style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08)', maxWidth: '600px' }}>
      <div className="mb-4">
        <h1 className="h6 fw-bold mb-1" style={{ color: '#1e293b' }}>New Analytics Report</h1>
        <BootstrapSwitch id="generate-overall" label="Generate Overall" checked={isToggled} onChange={setIsToggled} />
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-1">
          <label className="fw-semibold small" style={{ color: '#64748b' }}>Report Identifier</label>
          <input type="text" className="form-control shadow-none" style={FIELD_STYLE} value={notesManager.value} onChange={notesManager.handleChange} autoComplete='off' placeholder="Enter report name" />
          <CharacterAllow count={notesManager.count} limit={notesManager.limit} />
        </div>

        <div className="d-flex align-items-start gap-3">
          {!isToggled && (
            <div className="flex-grow-1 d-flex flex-column gap-1">
              <label className="fw-semibold small" style={{ color: '#64748b' }}>Target Scope*</label>
              <ScopeSelector value={selectedScope} onChange={handleScopeChange} />
            </div>
          )}

          <div className="d-flex gap-3 flex-wrap">
            {(selectedScope === 'TAX' || isToggled) && (
              <div className="d-flex flex-column gap-1">
                <label className="fw-semibold small" style={{ color: '#64748b' }}>Fiscal Year</label>
                <select className="form-select shadow-none" style={{ ...FIELD_STYLE, width: '160px' }} value={reportYear} onChange={(e) => setReportYear(e.target.value)}>
                  <option value="">Overall History</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            )}

            {(selectedScope === 'PROGRAM' || isToggled) && (
              <div className="d-flex flex-column gap-1">
                <label className="fw-semibold small" style={{ color: '#64748b' }}>Program ID</label>
                <input type="number" className="form-control shadow-none" style={{ ...FIELD_STYLE, width: '160px' }} placeholder="ID" value={programId} onChange={(e) => setProgramId(e.target.value)} min={1} />
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-primary w-100 mt-2 d-flex align-items-center justify-content-center" type="submit" disabled={isGenerating} style={{ height: '42px', fontWeight: '600', borderRadius: '8px', backgroundColor: '#2563eb', border: 'none' }}>
          {isGenerating ? <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</> : `Generate ${isToggled ? 'Overall' : selectedScope} Report`}
        </button>
      </form>
    </div>
  );
}