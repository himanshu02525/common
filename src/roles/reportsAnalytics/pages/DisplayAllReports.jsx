import React, { useEffect, useState, useCallback } from 'react';
import ReportsList from '../components/report/ReportsList';
import Loader from '../../../components/common/Loader';
import { fetchAll } from '../api/reportApi';
import EmptyState from '../../../components/common/EmptyState';
import CreateReportForm from '../components/generate/CreateReportForm';

function DisplayAllReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAll();
      const list = Array.isArray(data) ? data : data?.reports ?? data?.items ?? [];
      setReports(list);
    } catch (err) {
      console.error('fetchAll failed', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <Loader message="Loading reports..." />;
  if (error) return <EmptyState title="Failed to load reports" message={error} />;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="m-0">All Reports</h4>
        <div>
          <CreateReportForm onSuccess={(r) => { load(); }} />
        </div>
      </div>

      <ReportsList reports={reports || []} />
    </div>
  );
}

export default DisplayAllReports;
