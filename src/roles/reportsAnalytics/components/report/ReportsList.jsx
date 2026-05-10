import React from 'react';
import { EmptyState ,ReportCard} from '../../../../core/registry';

export default function ReportsList({ reports = [], emptyMessage = 'No reports available' }) {
  const reportItems = reports || [];

  if (reportItems.length === 0) {
    return <EmptyState title="No Reports" message={emptyMessage} />;
  }

  return (
    <div>
      {reportItems.map((reportItem) => (
        <ReportCard key={reportItem.reportId } report={reportItem} />
      ))}
    </div>
  );
}
