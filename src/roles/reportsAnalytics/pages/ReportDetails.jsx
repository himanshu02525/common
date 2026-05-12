import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BackButton, EmptyState, ReportViewer ,reportApi} from '../../../core/registry';

export default function ReportDetails() {
  const { id: routeReportId } = useParams();

  // 1. Setup local state for data, loading, and errors
  const [reportDetails, setReportDetails] = useState(null);
  const [parsedMetrics, setParsedMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // 2. Call the API directly when the component mounts or ID changes
  useEffect(() => {
    const getReportData = async () => {
      if (!routeReportId) return;

      try {
        setIsLoading(true);
        const data = await reportApi.fetchReportById(routeReportId);
        
        setReportDetails(data);
        
        // Handle metric parsing (assuming it might be a JSON string or needs formatting)
        const metrics = typeof data.metrics === 'string' 
          ? JSON.parse(data.metrics) 
          : (data.metrics || []);
        setParsedMetrics(metrics);

      } catch (err) {
        console.error("Error fetching report:", err);
        setLoadError(err.message || "Failed to fetch report details");
      } finally {
        setIsLoading(false);
      }
    };

    getReportData();
  }, [routeReportId]);

  // 3. Conditional Rendering based on state
  if (isLoading) {
    return <div className="container py-4">Loading report...</div>;
  }

  if (loadError) {
    return (
      <div className="container py-4">
        <EmptyState 
          title="Failed to load report" 
          message={loadError} 
        />
      </div>
    );
  }

  const safeReport = reportDetails || {};
console.log(parsedMetrics);

  return (
    <div className="container py-4">
      <BackButton />
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="mb-2">Report ID: {safeReport.reportId || 'N/A'}</h4>
          <ReportViewer 
            scope={safeReport.scope} 
            metrics={parsedMetrics} 
          />
        </div>
      </div>
    </div>
  );
}