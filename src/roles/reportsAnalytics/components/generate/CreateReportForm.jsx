import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useGenerateReport from '../../hooks/useGenerateReport';
import { CharacterAllow, ScopeSelector } from '../../../../core/registry';
import {useCharacterLimit}  from '../../../../hooks/roles/useCharacterLimit'
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

export default function CreateReportForm({ defaultScope = 'TAX', onSuccess }) {
  const [selectedScope, setSelectedScope] = useState(defaultScope);
  const [extraParam, setExtraParam] = useState('');
  const { generate, isGenerating } = useGenerateReport();
  const notesManager = useCharacterLimit('', 255);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      reportName=notesManager.value;
      const payload = await generate(selectedScope, extraParam, reportName || 'Untitled Report');
      if (typeof onSuccess === 'function') onSuccess(payload);
      toast.success('Report generated successfully');
      setReportName('');
      setExtraParam('');
    } catch (err) {
      toast.error('Failed to generate report: ' + (err.message || err));
    }
  }

  const handleScopeChange = (scope) => {
    setSelectedScope(scope);
    setExtraParam('');
  };

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
        <p className="text-muted small mb-0">Configure parameters to generate fresh insights.</p>
      </div>

      <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
        {/* Report Name Section */}
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
          />
          <CharacterAllow count={notesManager.count} limit={notesManager.limit}/>
        </div>

        {/* Row for Scope and Dynamic Inputs */}
        <div className="d-flex align-items-start gap-3">
          {/* Target Scope Section */}
          <div className="flex-grow-1 d-flex flex-column gap-1">
            <label className="fw-semibold small" style={{ color: '#64748b' }}>
              Target Scope<span className="text-danger">*</span>
            </label>
            <ScopeSelector
              value={selectedScope}
              onChange={handleScopeChange}
            />
          </div>

          {/* Dynamic Field Section (Tax or Program) */}
          {selectedScope === 'TAX' && (
            <div className="d-flex flex-column gap-1">
              <label className="fw-semibold small" style={{ color: '#64748b' }}>
                Fiscal Year
              </label>
              <select
                className="form-select shadow-none"
                style={{ ...FIELD_STYLE, width: '160px', cursor: 'pointer' }}
                value={extraParam}
                onChange={(e) => setExtraParam(e.target.value)}
              >
                <option value="">Full History</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          )}

          {selectedScope === 'PROGRAM' && (
            <div className="d-flex flex-column gap-1">
              <label className="fw-semibold small" style={{ color: '#64748b' }}>
                Program ID
              </label>
              <input
                type="number"
                className="form-control shadow-none"
                style={{ ...FIELD_STYLE, width: '160px' }}
                placeholder="Program ID"
                value={extraParam}
                onChange={(e) => setExtraParam(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Action Button */}
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
          ) : 'Generate Analytics'}
        </button>
      </form>
    </div>
  );
}