import React, { useEffect, useState } from 'react';
import ReportsList from './ReportsList';
import Loader from '../../../../components/common/Loader';
import { fetchAll } from '../../api/reportApi';
import EmptyState from '../../../../components/common/EmptyState';
import CreateReportForm from '../generate/CreateReportForm';

function DisplayAllReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const data = await fetchAll();
        if (!mounted) return;
        const list = Array.isArray(data) ? data : data?.reports ?? data?.items ?? [];
        setReports(list);
      } catch (err) {
        console.error('fetchAll failed', err);
        if (!mounted) return;
        setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <Loader message="Loading reports..." />;

  if (error) return <EmptyState title="Failed to load reports" message={error} />;
  return <ReportsList reports={reports || []} />;
}

export default DisplayAllReports;