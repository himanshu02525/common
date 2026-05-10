import React from 'react';
import { Link } from 'react-router-dom';

export default function ReportCard({ report }) {
  if (!report) return null;

  const reportPayload = report;
  const generatedAtSource = reportPayload.generatedDate || '';
  const safeReportId = reportPayload.reportId || 'N/A';

  return (
    <div className="card shadow-sm mb-3">
      {/* Changed align-items-start to align-items-center to center the button vertically */}
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="mb-1">{`Report ${safeReportId} ${reportPayload.reportName? `- ${reportPayload.reportName}` : ''}`}</h6>
          <div className="text-muted small">Scope: {reportPayload.scope}</div>
          <div className="text-muted small">Generated: {new Date(generatedAtSource).toLocaleDateString() +" at "+new Date(generatedAtSource).toLocaleTimeString()}</div>
        </div>
        <div className="text-end">
          <Link to={`/reports/${safeReportId}`} className="btn btn-sm btn-outline-primary py-2 px-5">View</Link>
        </div>
      </div>
    </div>
  );
}