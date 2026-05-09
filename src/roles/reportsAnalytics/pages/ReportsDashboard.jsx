import React from 'react';
import useAnalytics from '../hooks/useAnalytics';
import { EmptyState, AnalyticsOverview, RefetchButton } from '../../../core/registry';
export default function AnalyticsDashboard() {
  const { analyticsData, isLoadingAnalytics, analyticsError, refetch } = useAnalytics();

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0 d-flex align-items-center">Analytics Dashboard
          <RefetchButton onClick={refetch} loading={isLoadingAnalytics} title="Refresh analytics" />
        </h4>
      </div>

      {isLoadingAnalytics && <div className="text-muted">Loading analytics...</div>}
      {analyticsError && (
        <EmptyState title="Failed to load analytics" message={analyticsError.message || 'Unable to fetch analytics.'} />
      )}
      {analyticsData && <AnalyticsOverview analytics={analyticsData} />}
    </div>
  );
}
