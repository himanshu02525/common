import React from 'react';

export default function PieChart({ segments = [], size = 140 }) {
  const chartSegments = segments || [];
  const total = chartSegments.reduce((acc, seg) => acc + Number(seg.value || 0), 0) || 1;
  let cumulative = 0;

  return (
    <div style={{ width: '100%', maxWidth: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width="100%" height={size} role="img" aria-label="Pie chart">
        <title>Pie chart</title>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          {chartSegments.map((s, i) => {
            const startAngle = (cumulative / total) * 2 * Math.PI;
            cumulative += Number(s.value || 0);
            const endAngle = (cumulative / total) * 2 * Math.PI;
            const large = endAngle - startAngle > Math.PI ? 1 : 0;
            const r = size / 2;
            const x1 = Math.cos(startAngle) * r;
            const y1 = Math.sin(startAngle) * r;
            const x2 = Math.cos(endAngle) * r;
            const y2 = Math.sin(endAngle) * r;
            const d = `M 0 0 L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
            return <path key={i} d={d} fill={s.color || '#6c757d'} title={`${s.label}: ${s.value}`} />;
          })}
        </g>
      </svg>
      <div className="mt-2 small">
        {chartSegments.map((s) => (
          <div key={s.label} className="d-flex align-items-center mb-1">
            <span style={{ width: 10, height: 10, background: s.color, display: 'inline-block', marginRight: 8 }}></span>
            <span>{s.label} ({s.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
