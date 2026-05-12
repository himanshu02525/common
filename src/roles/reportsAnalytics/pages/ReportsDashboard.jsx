import React, { useEffect, useState, useCallback } from 'react';
import { 
  Loader, 
  EmptyState, 
  ReportsList, 
  RefetchButton, 
  reportApi 
} from '../../../core/registry';

function ReportsDashboard() {
  const [allReports, setAllReports] = useState([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const fetchAllReports = useCallback(async () => {
    setIsLoadingReports(true);
    setLoadError(null);

    try {
      const data = await reportApi.fetchAll();

      const normalizedList = Array.isArray(data)
        ? data
        : data?.reports ?? data?.items ?? [];

      setAllReports(normalizedList);

    } catch (err) {
      let backendMessage = "";

      if (err?.response?.data !== undefined) {
        const data = err.response.data;

        if (typeof data === "string") {
          backendMessage = data;
        } else if (data?.message) {
          backendMessage = data.message;
        } else if (data?.error) {
          backendMessage = data.error;
        } else if (data?.errors) {
          backendMessage = Array.isArray(data.errors)
            ? data.errors.join("\n")
            : JSON.stringify(data.errors, null, 2);
        } else {
          // fallback: raw backend response
          backendMessage = JSON.stringify(data, null, 2);
        }
      } else {
        backendMessage = err.message || String(err);
      }

      setLoadError(backendMessage);
    } finally {
      setIsLoadingReports(false);
    }
  }, []);

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  if (isLoadingReports && !allReports.length) {
    return <Loader message="Accessing report repository..." />;
  }

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h4 className="fw-bold mb-0 text-dark">
            Reporting History
          </h4>
        </div>

        <RefetchButton 
          onClick={fetchAllReports} 
          loading={isLoadingReports} 
          title="Sync Reports" 
        />
      </div>

      {loadError ? (
        <EmptyState 
          title="Data Retrieval Error"
          message={
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>
              {loadError}
            </pre>
          }
        />
      ) : (
        <div className="reports-content-area">
          {allReports.length === 0 ? (
            <EmptyState 
              title="No Reports Found"
              message="Start by generating a new analytics report to see it listed here."
            />
          ) : (
            <ReportsList reports={allReports} />
          )}
        </div>
      )}
    </div>
  );
}

export default ReportsDashboard;