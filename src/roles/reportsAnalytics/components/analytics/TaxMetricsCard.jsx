import React from 'react';
import StatItem from '../../../../components/ui/StatItem';

export default function TaxMetricsCard({ data = {} }) {
  // Accept both camelCase and snake_case payloads from API and coerce to numbers
  const revenueCollected = Number(data.revenueCollected ?? data.revenue_collected ?? data.revenue ?? 0);
  const totalRecords = Number(data.totalRecords ?? data.total_records ?? data.records ?? 0);
  const totalTaxpayers = Number(data.totalTaxpayers ?? data.total_taxpayers ?? data.taxpayers ?? 0);
  const paidCount = Number(data.paidCount ?? data.paid_count ?? data.paid ?? 0);
  const overdueCount = Number(data.overdueCount ?? data.overdue_count ?? data.overdue ?? 0);

  return (
    <div className="col-12">
      <div className="card shadow-sm h-100 p-0">
        <div className="card-body p-4">
          <h6 className="card-title text-muted text-uppercase text-center">Tax Metrics</h6>

          <div className="row">
            <div className="col-12">
              <h3 className="mb-3">₹{revenueCollected.toLocaleString()}</h3>
              <div className="mb-2">
                <StatItem label="Total Records" value={totalRecords.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Total Taxpayers" value={totalTaxpayers.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Paid" value={paidCount.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Overdue" value={overdueCount.toLocaleString()} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
