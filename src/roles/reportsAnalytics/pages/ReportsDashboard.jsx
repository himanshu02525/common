import React from 'react';
import useAnalytics from '../hooks/useAnalytics';
import AnalyticsOverview from '../components/analytics/AnalyticsOverview';
import CreateReportForm from '../components/generate/CreateReportForm';
import EmptyState from '../../../components/common/EmptyState';

export default function ReportsDashboard() {
  const { data, loading, error, refetch } = useAnalytics();

  return (
    <div className="container py-4">
            {loading && <div className="text-muted">Loading analytics...</div>}
      {error && <EmptyState title="Failed to load analytics" message={error.message || 'Unable to fetch analytics.'} />}
      {data && <AnalyticsOverview analytics={data} />}
    </div>
  );
}
