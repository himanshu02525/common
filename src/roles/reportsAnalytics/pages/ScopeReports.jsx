import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import useReportsByScope from '../hooks/useReportsByScope';
import ReportsList from '../components/report/ReportsList';
import CreateReportForm from '../components/generate/CreateReportForm';
import EmptyState from '../../../components/common/EmptyState';

export default function ScopeReports() {
  const { scope: pathScope } = useParams();
  const { search } = useLocation();

  // Accept query param ?scope=subsidy OR path param /reports/scope/subsidy
  const qs = new URLSearchParams(search);
  const rawScope = (qs.get('scope') || pathScope || '').trim();

  // Backend expects uppercase scope (e.g. SUBSIDY)
  const normalizedScope = rawScope ? rawScope.toUpperCase() : undefined;

  const { reports, loading, error, setReports } = useReportsByScope(normalizedScope);

  return (
    <div className="container py-4">
      <div className="mb-3">
        <Link to="/reports/analytics">Back to Dashboard</Link>
      </div>

      {loading && <div className="text-muted">Loading reports...</div>}
      {error && <EmptyState title="Failed to load reports" message={error.message || 'Unable to fetch reports.'} />}

      <ReportsList reports={reports} />
    </div>
  );
}
