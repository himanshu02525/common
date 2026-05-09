import React from 'react';

export default function ProgramStackedBar({ data = {} }) {
  if (!data) return null;

  const programData = data || {};
  const activeProgramCount = Number(programData.activePrograms ?? programData.active_programs ?? 0);
  const closedProgramCount = Number(programData.closedPrograms ?? programData.closed_programs ?? 0);
  const totalProgramCount = (activeProgramCount + closedProgramCount) || 1;
  const activePct = Math.round((activeProgramCount / totalProgramCount) * 100);
  const closedPct = 100 - activePct;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">Programs Status</h6>
        <div className="mb-2 small text-muted">Active vs Closed</div>
        <div className="d-flex align-items-center">
          <div className="w-100 me-3" style={{ height: 28, background: '#f1f3f5', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
            <div
              style={{ width: `${activePct}%`, height: '100%', background: '#0d6efd', display: 'inline-block', position: 'relative' }}
              title={`Active: ${activeProgramCount} (${activePct}%)`}
              aria-label={`Active programs ${activeProgramCount} which is ${activePct} percent`}
            >
              {activePct > 10 ? (
                <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', color: '#fff', height: '100%', display: 'flex', alignItems: 'center', fontSize: 12 }}>{activePct}%</div>
              ) : null}
            </div>
            <div
              style={{ width: `${closedPct}%`, height: '100%', background: '#6c757d', display: 'inline-block', position: 'relative' }}
              title={`Closed: ${closedProgramCount} (${closedPct}%)`}
              aria-label={`Closed programs ${closedProgramCount} which is ${closedPct} percent`}
            >
              {closedPct > 10 ? (
                <div style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', color: '#fff', height: '100%', display: 'flex', alignItems: 'center', fontSize: 12 }}>{closedPct}%</div>
              ) : null}
            </div>
            {activePct <= 10 && <div style={{ position: 'absolute', left: 'calc(100% + 8px)', top: 0, height: 28, display: 'flex', alignItems: 'center' }}><small className="text-muted">{activePct}%</small></div>}
            {closedPct <= 10 && <div style={{ position: 'absolute', left: 'calc(100% + 8px)', top: 18, height: 28, display: 'flex', alignItems: 'center' }}><small className="text-muted">{closedPct}%</small></div>}
          </div>
          <div style={{ width: 80 }}>
            <div className="small"><span className="badge bg-primary me-1">{activeProgramCount}</span> Active</div>
            <div className="small mt-1"><span className="badge bg-secondary me-1">{closedProgramCount}</span> Closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
