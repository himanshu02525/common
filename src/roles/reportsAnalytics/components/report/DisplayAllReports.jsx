import React, { useEffect, useState } from 'react';
import { EmptyState, Loader, ReportsList } from '../../../../core/registry';
import { fetchAllReports } from '../../../../redux/reportsAnalyticsSlice';

function DisplayAllReports() {
  const [allReports, setAllReports] = useState(null);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function loadReports() {
      setIsLoadingReports(true);
      try {
        const responsePayload = await fetchAllReports();
        if (!mounted) return;
        const normalizedList = Array.isArray(responsePayload)
          ? responsePayload
          : responsePayload?.reports ?? responsePayload?.items ?? [];
        setAllReports(normalizedList);
      } catch (err) {
        console.error('fetchAllReports failed', err);
        if (!mounted) return;
        setLoadError(err.message || String(err));
      } finally {
        if (mounted) setIsLoadingReports(false);
      }
    }

    loadReports();
    return () => {
      mounted = false;
    };
  }, []);

  if (isLoadingReports) return <Loader message="Loading reports..." />;

  if (loadError) return <EmptyState title="Failed to load reports" message={loadError} />;
  return <ReportsList reports={allReports || []} />;
}

export default DisplayAllReports;