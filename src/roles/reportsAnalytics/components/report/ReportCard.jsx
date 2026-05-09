import React from 'react';
import { Link } from 'react-router-dom';
import { parseMetrics } from '../../utils/parseMetrics';

export default function ReportCard({ report }) {
  if (!report) return null;

  const reportPayload = report;
  const parsedMetrics = parseMetrics(reportPayload.metrics || reportPayload?.metricsString);
  const generatedAtSource = parsedMetrics.generatedAt || reportPayload.generatedDate || '';
  const safeReportId = reportPayload.reportId || reportPayload.id || 'N/A';

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6 className="mb-1">Report #{safeReportId}</h6>
          <div className="text-muted small">Scope: {reportPayload.scope}</div>
          <div className="text-muted small">Generated: {new Date(generatedAtSource).toLocaleString()}</div>
        </div>
        <div className="text-end">
          <div className="mb-2">
            <Link to={`/reports/${safeReportId}`} className="btn btn-sm btn-outline-primary">View</Link>
          </div>
          <span className="badge bg-secondary">{reportPayload.scope}</span>
        </div>
      </div>
    </div>
  );
}
