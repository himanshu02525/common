import React from 'react';
import ReportCard from './ReportCard';
import EmptyState from '../../../../components/common/EmptyState';

export default function ReportsList({ reports = [], emptyMessage = 'No reports available' }) {
  if (!reports || reports.length === 0) {
    return <EmptyState title="No Reports" message={emptyMessage} />;
  }

  return (
    <div>
      {reports.map((r) => (
        <ReportCard key={r.reportId} report={r} />
      ))}
    </div>
  );
}
