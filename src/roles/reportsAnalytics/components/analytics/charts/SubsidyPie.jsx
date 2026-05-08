import React from 'react';

function Pie({ slices = [], size = 120 }) {
  const radius = size / 2;
  const total = slices.reduce((a, b) => a + b.value, 0) || 1;
  let cumulative = 0;

  const pathForSlice = (startPercent, percent) => {
    const [startX, startY] = getCoordinatesForPercent(startPercent);
    const [endX, endY] = getCoordinatesForPercent(startPercent + percent);
    const large = percent > 0.5 ? 1 : 0;
    return `M ${radius} ${radius} L ${startX} ${startY} A ${radius} ${radius} 0 ${large} 1 ${endX} ${endY} Z`;
  };

  const getCoordinatesForPercent = (percent) => {
    const x = radius + radius * Math.cos(2 * Math.PI * percent - Math.PI / 2);
    const y = radius + radius * Math.sin(2 * Math.PI * percent - Math.PI / 2);
    return [x, y];
  };

  return (
    <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet">
      {slices.map((s, i) => {
        const valuePct = s.value / total;
        const path = pathForSlice(cumulative, valuePct);
        const pct = Math.round(valuePct * 100);
        cumulative += valuePct;
        return (
          <path key={i} d={path} fill={s.color} stroke="#fff" strokeWidth={1} title={`${s.label}: ${s.value} (${pct}%)`}>
            <title>{`${s.label}: ${s.value} (${pct}%)`}</title>
          </path>
        );
      })}
    </svg>
  );
}

export default function SubsidyPie({ data = {} }) {
  const { approvedApplications = 0, rejectedApplications = 0, onHoldCount = 0 } = data;
  const slices = [
    { label: 'Approved', value: approvedApplications, color: '#198754' },
    { label: 'Rejected', value: rejectedApplications, color: '#dc3545' },
    { label: 'On Hold', value: onHoldCount, color: '#ffc107' }
  ];

  const total = slices.reduce((a, b) => a + b.value, 0) || 1;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">Subsidy Outcomes</h6>
        <div className="d-flex flex-column align-items-center">
          <div className="mb-3" style={{ width: 140 }}>
            <Pie slices={slices} />
          </div>

          <div className="w-100">
            {slices.map((s) => {
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
