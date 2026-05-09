import React from 'react';
import { StatItem } from '../../../../core/registry';

export default function TaxMetricsCard({ data = {} }) {
  if (!data) return null;

  // Map incoming payload to clearly named local variables and coerce to numbers
  const taxMetricsSource = data;
  const revenueCollectedAmount = Number(
    taxMetricsSource.revenueCollected ?? taxMetricsSource.revenue_collected ?? taxMetricsSource.revenue ?? 0
  );
  const totalRecordCount = Number(
    taxMetricsSource.totalRecords ?? taxMetricsSource.total_records ?? taxMetricsSource.records ?? 0
  );
  const totalTaxpayerCount = Number(
    taxMetricsSource.totalTaxpayers ?? taxMetricsSource.total_taxpayers ?? taxMetricsSource.taxpayers ?? 0
  );
  const paidCountNumber = Number(
    taxMetricsSource.paidCount ?? taxMetricsSource.paid_count ?? taxMetricsSource.paid ?? 0
  );
  const overdueCountNumber = Number(
    taxMetricsSource.overdueCount ?? taxMetricsSource.overdue_count ?? taxMetricsSource.overdue ?? 0
  );

  return (
    <div className="col-12">
      <div className="card shadow-sm h-100 p-0">
        <div className="card-body p-4">
          <h6 className="card-title text-muted text-uppercase text-center">Tax Metrics</h6>

          <div className="row">
            <div className="col-12">
              <h3 className="mb-3">₹{revenueCollectedAmount.toLocaleString()}</h3>
              <div className="mb-2">
                <StatItem label="Total Records" value={totalRecordCount.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Total Taxpayers" value={totalTaxpayerCount.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Paid" value={paidCountNumber.toLocaleString()} />
              </div>
              <div className="mb-2">
                <StatItem label="Overdue" value={overdueCountNumber.toLocaleString()} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
