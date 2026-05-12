import React, { useEffect, useState, useCallback } from 'react';
import { Loader, EmptyState, ReportsList, RefetchButton } from '../../../core/registry';
import { fetchAllReports } from '../../../redux/reportsAnalyticsSlice'; 

function ReportsDashboard() {
  const [allReports, setAllReports] = useState(null);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const fetchAllReports = useCallback(async () => {
    setIsLoadingReports(true);
    setLoadError(null);
    try {
      const responsePayload = await fetchAllReports();
      const normalizedList = Array.isArray(responsePayload)
        ? responsePayload
        : responsePayload?.reports ?? responsePayload?.items ?? [];
      setAllReports(normalizedList);
    } catch (err) {
      console.error('fetchAllReports failed', err);
      setLoadError(err.message || String(err));
    } finally {
      setIsLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  if (isLoadingReports) return <Loader message="Loading reports..." />;
  if (loadError) return <EmptyState title="Failed to load reports" message={loadError} />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0 d-flex align-items-center">All Reports
        </h4>
          <RefetchButton onClick={fetchAllReports} loading={isLoadingReports} title="Refresh reports" />
        
      </div>

      <ReportsList reports={allReports || []} />
    </div>
  );
}

export default ReportsDashboard;
