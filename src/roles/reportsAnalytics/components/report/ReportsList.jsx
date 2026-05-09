import React from 'react';
import ReportCard from './ReportCard';
import { EmptyState } from '../../../../core/registry';

export default function ReportsList({ reports = [], emptyMessage = 'No reports available' }) {
  const reportItems = reports || [];

  if (reportItems.length === 0) {
    return <EmptyState title="No Reports" message={emptyMessage} />;
  }

  return (
    <div>
      {reportItems.map((reportItem) => (
        <ReportCard key={reportItem.reportId || reportItem.id} report={reportItem} />
      ))}
    </div>
  );
}
