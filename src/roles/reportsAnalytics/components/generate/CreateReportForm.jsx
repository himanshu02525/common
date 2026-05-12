import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useGenerateReport from '../../hooks/useGenerateReport';
import { CharacterAllow, ScopeSelector, BootstrapSwitch ,useCharacterLimit} from '../../../../core/registry';

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

export default function CreateReportForm({ onSuccess }) {
  const [selectedScope, setSelectedScope] = useState('TAX');
  const [reportYear, setReportYear] = useState('');
  const [programId, setProgramId] = useState('');
  const [isToggled, setIsToggled] = useState(false);

  const { generate, isGenerating } = useGenerateReport();
  const notesManager = useCharacterLimit('', 255);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handleScopeChange = (scope) => {
    setSelectedScope(scope);
    setReportYear('');
    setProgramId('');

  };

async function handleSubmit(event) {
  event.preventDefault();

  try {
    const reportName = notesManager.value.trim();
    let scope = selectedScope;
    let year = null;
    let programIdVal = null;

    if (isToggled) {
      scope = 'OVERALL';
      year = reportYear || null;
      programIdVal = programId || null;
    } else {
      // ✅ Non-overall logic
      if (selectedScope === 'TAX') {
        year = reportYear || null;
      } 
      else if (selectedScope === 'PROGRAM') {
        programIdVal = programId || null;
      }
      
    }

    const payload = await generate(scope, year, programIdVal, reportName);

    if (typeof onSuccess === 'function') onSuccess(payload);
    toast.success('Report generated successfully');
  } catch (err) {
    toast.error('Failed: ' + (err.message || err));
  }
}

  return (
    <div
      className="p-4 rounded-4 mx-auto"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.08)',
        maxWidth: '600px'
      }}
    >
      <div className="mb-4">
        <h1 className="h6 fw-bold mb-1" style={{ color: '#1e293b', letterSpacing: '-0.01em' }}>
          New Analytics Report
        </h1>
        <BootstrapSwitch
          id="generate-overall"
          label="Generate Overall"
          checked={isToggled}
          onChange={setIsToggled}
        />
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-1">
          <label className="fw-semibold small" style={{ color: '#64748b' }}>
            Report Identifier
          </label>
          <input
            type="text"
            name="reportName"
            placeholder="Enter report name"
            className="form-control shadow-none"
            style={FIELD_STYLE}
            value={notesManager.value}
            onChange={notesManager.handleChange}
            autoComplete='off'
          />
          <CharacterAllow count={notesManager.count} limit={notesManager.limit} />
        </div>

        <div className="d-flex align-items-start gap-3">
          {!isToggled && (
            <div className="flex-grow-1 d-flex flex-column gap-1">
              <label className="fw-semibold small" style={{ color: '#64748b' }}>
                Target Scope<span className="text-danger">*</span>
              </label>
              <ScopeSelector
                value={selectedScope}
                onChange={handleScopeChange}
              />
            </div>
          )}

          <div className="d-flex gap-3 flex-wrap">
            {(selectedScope === 'TAX' || isToggled) && (
              <div className="d-flex flex-column gap-1">
                <label className="fw-semibold small" style={{ color: '#64748b' }}>
                  Fiscal Year
                </label>
                <select
                  className="form-select shadow-none"
                  style={{ ...FIELD_STYLE, width: '160px', cursor: 'pointer' }}
                  value={reportYear}
                  onChange={(e) => setReportYear(e.target.value)}
                >
                  <option key="" value="">Overall History</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            )}

            {(selectedScope === 'PROGRAM' || isToggled) && (
              <div className="d-flex flex-column gap-1">
                <label className="fw-semibold small" style={{ color: '#64748b' }}>
                  Program ID
                </label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  style={{ ...FIELD_STYLE, width: '160px' }}
                  placeholder="ID"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  min={1}
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="btn btn-primary w-100 mt-2 d-flex align-items-center justify-content-center"
          type="submit"
          disabled={isGenerating}
          style={{
            height: '42px',
            fontWeight: '600',
            borderRadius: '8px',
            backgroundColor: '#2563eb',
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
          }}
        >
          {isGenerating ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              <span>Processing...</span>
            </>
          ) : `Generate ${isToggled ? 'Overall' : selectedScope} Report`}
        </button>
      </form>
    </div>
  );
}