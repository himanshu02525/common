import React from 'react';
import { useParams } from 'react-router-dom';
import useReportDetails from '../hooks/useReportDetails';
import ReportViewer from '../components/report/ReportViewer';
import EmptyState from '../../../components/common/EmptyState';
import PieChart from '../components/analytics/charts/PieChart';

export default function ReportDetails() {
  const { id } = useParams();
  const { report, metrics, loading, error } = useReportDetails(id);

  if (loading) return <div className="container py-4">Loading report...</div>;
  if (error) return <div className="container py-4"><EmptyState title="Failed to load report" message={error.message || 'Unable to fetch the report.'} /></div>;
  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-2">Report ID : {report.reportId}</h4>
          <ReportViewer scope={report.scope} metrics={metrics} />
        </div>
      </div>
    </div>
  );
}
