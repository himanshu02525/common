import { useParams } from 'react-router-dom';
import useReportDetails from '../hooks/useReportDetails';
import { EmptyState, ReportViewer } from '../../../core/registry';

export default function ReportDetails() {
  const { id: routeReportId } = useParams();
  const { reportDetails, parsedMetrics, isLoading, loadError } = useReportDetails(routeReportId);

  if (isLoading) return <div className="container py-4">Loading report...</div>;
  if (loadError)
    return (
      <div className="container py-4">
        <EmptyState title="Failed to load report" message={loadError.message || 'Unable to fetch the report.'} />
      </div>
    );

  const safeReport = reportDetails || {};

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-2">Report ID : {safeReport.reportId || 'N/A'}</h4>
          <ReportViewer scope={safeReport.scope} metrics={parsedMetrics} />
        </div>
      </div>
    </div>
  );
}
