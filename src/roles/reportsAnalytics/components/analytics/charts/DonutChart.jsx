import React from 'react';

// Generic reusable DonutChart component
// Props:
// - segments: [{ label, value, color }]
// - size: diameter in px (number)
// - stroke: ring thickness
// - showLegend: boolean
export default function DonutChart({ segments = [], size = 140, stroke = 20, showLegend = true }) {
  const chartSegments = segments || [];
  if (!chartSegments || chartSegments.length === 0) return null;

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const totalValue = chartSegments.reduce((acc, seg) => acc + (Number(seg.value) || 0), 0) || 1;
  let offset = 0;

  return (
    <div className="donut-chart" style={{ width: '100%', maxWidth: size }}>
      <svg width="100%" height={size} viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid meet" role="img" aria-label="Donut chart">
        <title>Donut chart</title>
        <g transform={`translate(${size / 2}, ${size / 2}) rotate(-90)`}>
          {chartSegments.map((segment, index) => {
            const segmentLength = ((Number(segment.value) || 0) / totalValue) * circumference;
            const strokeDasharray = `${segmentLength} ${circumference}`;
            const circle = (
              <circle
                key={index}
                r={radius}
                fill="transparent"
                stroke={segment.color || '#6c757d'}
                strokeWidth={stroke}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                title={`${segment.label}: ${segment.value} (${Math.round(((Number(segment.value)||0)/totalValue)*100)}%)`}
              />
            );
            offset += segmentLength;
            return circle;
          })}
        </g>
      </svg>

      {showLegend && (
        <div className="mt-2">
          {chartSegments.map((segment) => (
            <div key={segment.label} className="d-flex align-items-center justify-content-between small" title={`${segment.label}: ${segment.value}`}>
              <div className="d-flex align-items-center">
                <span style={{ width: 12, height: 12, background: segment.color, display: 'inline-block', marginRight: 8, borderRadius: 2 }}></span>
                <span>{segment.label}</span>
              </div>
              <div className="text-muted">{segment.value} <small className="text-muted">({Math.round(((Number(segment.value)||0)/totalValue)*100)}%)</small></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
