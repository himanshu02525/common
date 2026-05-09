import { useParams, Link, useLocation } from 'react-router-dom';
import { EmptyState, ReportsList, RefetchButton } from '../../../core/registry';
import useReportsByScope from '../hooks/useReportsByScope';

export default function ScopeReports() {
  const { scope: pathScope } = useParams();
  const { search } = useLocation();

  // Accept query param ?scope=subsidy OR path param /reports/scope/subsidy
  const queryParams = new URLSearchParams(search);
  const requestedScope = (queryParams.get('scope') || pathScope || '').trim();

  // Backend expects uppercase scope (e.g. SUBSIDY)
  const normalizedScope = requestedScope ? requestedScope.toUpperCase() : undefined;

  const { scopedReports, isLoadingReports, loadError, setScopedReports, refetch } = useReportsByScope(normalizedScope);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Link to="/reports/analytics">Back to Dashboard</Link>
        </div>
        <div>
          <RefetchButton onClick={() => refetch && refetch()} loading={isLoadingReports} title="Refresh scoped reports" />
        </div>
      </div>

      {isLoadingReports && <div className="text-muted">Loading reports...</div>}
      {loadError && <EmptyState title="Failed to load reports" message={loadError.message || 'Unable to fetch reports.'} />}

      <ReportsList reports={scopedReports} />
    </div>
  );
}
