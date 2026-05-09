import React from 'react';
import {DonutChart} from '../../../../../core/registry';

export default function TaxDonutChart({ data = {} }) {
  if (!data) return null;

  const taxDistributionSource = data || {};
  const paidCount = Number(taxDistributionSource.paidCount ?? taxDistributionSource.paid_count ?? taxDistributionSource.paid ?? 0);
  const pendingCount = Number(taxDistributionSource.pendingCount ?? taxDistributionSource.pending_count ?? taxDistributionSource.pending ?? 0);
  const overdueCount = Number(taxDistributionSource.overdueCount ?? taxDistributionSource.overdue_count ?? taxDistributionSource.overdue ?? 0);
  const rejectedCount = Number(taxDistributionSource.rejectedCount ?? taxDistributionSource.rejected_count ?? taxDistributionSource.rejected ?? 0);

  const chartSegments = [
    { label: 'Paid', value: paidCount, color: '#198754' },
    { label: 'Pending', value: pendingCount, color: '#0d6efd' },
    { label: 'Overdue', value: overdueCount, color: '#dc3545' },
    { label: 'Rejected', value: rejectedCount, color: '#6c757d' }
  ];

  const totalCount = chartSegments.reduce((acc, seg) => acc + Number(seg.value || 0), 0);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">Tax Distribution</h6>
        <div className="d-flex flex-column align-items-center">
          <div style={{ width: 140 }} className="mb-3">
            <DonutChart segments={chartSegments} size={140} stroke={18} showLegend={false} />
            <div className="text-center mt-2 small text-muted">Total: {totalCount}</div>
          </div>

          <div className="w-100">
            {chartSegments.map((segment) => {
               const percentage = totalCount > 0
                ? Math.round((Number(segment.value || 0) / totalCount) * 100)
                : 0;

              return (
                <div
                  key={segment.label}
                  className="d-flex align-items-center justify-content-between mb-1"
                  title={`${segment.label}: ${segment.value} (${percentage}%)`}
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        background: segment.color,
                        marginRight: 8,
                        borderRadius: 2
                      }}
                    ></div>
                    <div className="small">{segment.label}</div>
                  </div>
                  <div className="fw-semibold">
                    {segment.value || 0}
                    <small className="text-muted ms-1">({percentage}%)</small>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
