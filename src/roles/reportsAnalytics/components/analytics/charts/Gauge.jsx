import React from 'react';

export default function Gauge({ value = 0, min = 0, max = 100, size = 160, color = '#0d6efd' }) {
  const currentValue = Number(value || 0);
  const minValue = Number(min || 0);
  const maxValue = Number(max || 100);
  const clamped = Math.max(minValue, Math.min(maxValue, currentValue));
  const pct = (clamped - minValue) / (maxValue - minValue || 1);
  const start = Math.PI; // left
  const end = 0; // right
  const angle = start + (end - start) * pct; // angle in radians
  const r = size / 2;
  const cx = size / 2;
  const cy = size / 2;
  const needleX = cx + Math.cos(angle) * (r * 0.7);
  const needleY = cy + Math.sin(angle) * (r * 0.7);

  return (
    <div style={{ width: '100%', maxWidth: size }}>
      <svg viewBox={`0 0 ${size} ${size / 2}`} width="100%" height={size / 2} role="img" aria-label="Gauge">
        <title>Gauge</title>
        <g transform={`translate(0,0)`}>
          <path d={`M ${size*0.1} ${size/2} A ${r} ${r} 0 0 1 ${size*0.9} ${size/2}`} fill="none" stroke="#e9ecef" strokeWidth="12" />
          <path d={`M ${size*0.1} ${size/2} A ${r} ${r} 0 0 1 ${needleX} ${needleY}`} fill="none" stroke={color} strokeWidth="12" />
          <line x1={cx} y1={size/2} x2={needleX} y2={needleY} stroke="#333" strokeWidth="2" />
        </g>
      </svg>
      <div className="text-center small">{clamped} / {maxValue}</div>
    </div>
  );
}
