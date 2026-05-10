import React, { useState, useMemo } from 'react';
import { EmptyState, ReportCard } from '../../../../core/registry';

export default function ReportsList({ reports = [], emptyMessage = 'No reports available' }) {
  const [idOrder, setIdOrder] = useState('desc'); 
  const [scopeFilter, setScopeFilter] = useState('ALL'); // Changed default to 'ALL'

  const scopeCycle = ['PROGRAM', 'SUBSIDY', 'TAX'];

  const handleScopeCycle = () => {
    // If we are currently on ALL, start the cycle at the first element
    if (scopeFilter === 'ALL') {
      setScopeFilter(scopeCycle[0]);
    } else {
      const currentIndex = scopeCycle.indexOf(scopeFilter);
      const nextIndex = (currentIndex + 1) % scopeCycle.length;
      setScopeFilter(scopeCycle[nextIndex]);
    }
  };

  const handleClearFilters = () => {
    setScopeFilter('ALL');
  };

  const sortedAndFilteredReports = useMemo(() => {
    // 1. Filter logic: Show all if 'ALL', otherwise match scope
    let list = scopeFilter === 'ALL' 
      ? [...reports] 
      : reports.filter(r => r.scope === scopeFilter);

    // 2. Sort by ID
    return list.sort((a, b) => {
      return idOrder === 'asc' 
        ? a.reportId - b.reportId 
        : b.reportId - a.reportId;
    });
  }, [reports, idOrder, scopeFilter]);

  if (reports.length === 0) {
    return <EmptyState title="No Reports" message={emptyMessage} />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3 bg-light border">
        <div className="d-flex gap-3 align-items-center">
          
          {/* Scope Cycle Controls */}
          <div className="d-flex flex-column">
            <span className="small text-muted fw-bold mb-1">Scope Filter</span>
            <div className="btn-group shadow-sm">
              <button 
                className={`btn btn-sm ${scopeFilter === 'ALL' ? 'btn-secondary' : 'btn-white border'} fw-bold`}
                onClick={handleScopeCycle}
                style={{ minWidth: '110px' }}
              >
                {scopeFilter === 'ALL' ? 'Select Scope' : scopeFilter}
              </button>
              
              {scopeFilter !== 'ALL' && (
                <button 
                  className="btn btn-sm btn-danger border-start-0" 
                  onClick={handleClearFilters}
                  title="Clear Filter"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ID Sort Toggle */}
          <div className="d-flex flex-column">
            <span className="small text-muted fw-bold mb-1">ID Order</span>
            <button 
              className="btn btn-sm btn-white border shadow-sm"
              onClick={() => setIdOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {idOrder === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
            </button>
          </div>
        </div>

        {scopeFilter === 'ALL' && (
          <div className="badge bg-primary rounded-pill px-3 py-2">
            Showing All Scopes
          </div>
        )}
      </div>

      {sortedAndFilteredReports.length > 0 ? (
        sortedAndFilteredReports.map((reportItem) => (
          <ReportCard key={reportItem.reportId} report={reportItem} />
        ))
      ) : (
        <div className="text-center p-5 border rounded-3 bg-white shadow-sm">
          <p className="text-muted mb-3">No reports found for <strong>{scopeFilter}</strong></p>
          <button className="btn btn-sm btn-outline-primary" onClick={handleClearFilters}>
            Show All Reports
          </button>
        </div>
      )}
    </div>
  );
}