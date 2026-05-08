import React from 'react';

// Generic reusable DonutChart component
// Props:
// - segments: [{ label, value, color }]
// - size: diameter in px (number)
// - stroke: ring thickness
// - showLegend: boolean
export default function DonutChart({ segments = [], size = 140, stroke = 20, showLegend = true }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((a, b) => a + (b.value || 0), 0) || 1;
  let offset = 0;

  return (
    <div className="donut-chart" style={{ width: '100%', maxWidth: size }}>
      <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Donut chart">
        <title>Donut chart</title>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}> 
          {segments.map((s, i) => {
            const len = ((s.value || 0) / total) * circumference;
            const strokeDasharray = `${len} ${circumference}`;
            const circle = (
              <circle
                key={i}
                r={radius}
                fill="transparent"
                stroke={s.color || '#6c757d'}
                strokeWidth={stroke}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                title={`${s.label}: ${s.value} (${Math.round(((s.value||0)/total)*100)}%)`}
              />
            );
            offset += len;
            return circle;
          })}
        </g>
      </svg>

      {showLegend && (
        <div className="mt-2">
          {segments.map((s) => (
            <div key={s.label} className="d-flex align-items-center justify-content-between small" title={`${s.label}: ${s.value}`}>
              <div className="d-flex align-items-center">
                <span style={{ width: 12, height: 12, background: s.color, display: 'inline-block', marginRight: 8, borderRadius: 2 }}></span>
                <span>{s.label}</span>
              </div>
              <div className="text-muted">{s.value} <small className="text-muted">({Math.round(((s.value||0)/total)*100)}%)</small></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
