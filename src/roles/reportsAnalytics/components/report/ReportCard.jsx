import React from 'react';
import { Link } from 'react-router-dom';
import { parseMetrics } from '../../utils/parseMetrics';

export default function ReportCard({ report }) {
  const metrics = parseMetrics(report.metrics || report?.metricsString);
  const generatedAt = metrics.generatedAt || report.generatedDate || '';

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body d-flex justify-content-between align-items-start">
        <div>
          <h6 className="mb-1">Report #{report.reportId}</h6>
          <div className="text-muted small">Scope: {report.scope}</div>
          <div className="text-muted small">Generated: {new Date(generatedAt).toLocaleString()}</div>
        </div>
        <div className="text-end">
          <div className="mb-2">
            <Link to={`/reports/${report.reportId}`} className="btn btn-sm btn-outline-primary">View</Link>
          </div>
          <span className="badge bg-secondary">{report.scope}</span>
        </div>
      </div>
    </div>
  );
}
