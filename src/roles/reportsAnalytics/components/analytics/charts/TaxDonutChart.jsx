import React from 'react';
import DonutChart from '../../../../../components/charts/DonutChart';
function Donut({ segments = [], size = 140, stroke = 20 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
      <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
        {segments.map((s, i) => {
          const len = (s.value / Math.max(1, segments.reduce((a, b) => a + b.value, 0))) * circumference;
          const strokeDasharray = `${len} ${circumference}`;
          const circle = (
            <circle
              key={i}
              r={radius}
              fill="transparent"
              stroke={s.color}
              strokeWidth={stroke}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return circle;
        })}
      </g>
    </svg>
  );
}

export default function TaxDonutChart({ data = {} }) {
  const { paidCount = 0, pendingCount = 0, overdueCount = 0, rejectedCount = 0 } = data;
  const segments = [
    { label: 'Paid', value: paidCount, color: '#198754' },
    { label: 'Pending', value: pendingCount, color: '#0d6efd' },
    { label: 'Overdue', value: overdueCount, color: '#dc3545' },
    { label: 'Rejected', value: rejectedCount, color: '#6c757d' }
  ];

  const total = segments.reduce((a, b) => a + b.value, 0) || 1;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">Tax Distribution</h6>
        <div className="d-flex flex-column align-items-center">
          <div style={{ width: 140 }} className="mb-3">
            <DonutChart segments={segments} size={140} stroke={18} showLegend={false} />
            <div className="text-center mt-2 small text-muted">Total: {total}</div>
          </div>

          <div className="w-100">
            {segments.map((s) => {
              const pct = Math.round((s.value / total) * 100);
              return (
                <div key={s.label} className="d-flex align-items-center justify-content-between mb-1" title={`${s.label}: ${s.value} (${pct}%)`}>
                  <div className="d-flex align-items-center">
                    <div style={{ width: 12, height: 12, background: s.color, marginRight: 8, borderRadius: 2 }}></div>
                    <div className="small">{s.label}</div>
                  </div>
                  <div className="fw-semibold">{s.value} <small className="text-muted">({pct}%)</small></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
