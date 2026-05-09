import React from 'react';

export default function HorizontalStackedBar({ segments = [], height = 28 }) {
  const chartSegments = segments || [];
  const totalValue = chartSegments.reduce((acc, seg) => acc + (Number(seg.value) || 0), 0) || 1;

  return (
    <div className="w-100">
      <div style={{ display: 'flex', height }} aria-hidden>
        {chartSegments.map((segment, index) => {
          const pct = ((Number(segment.value) || 0) / totalValue) * 100;
          return (
            <div
              key={index}
              style={{
                width: `${pct}%`,
                background: segment.color || '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: pct > 8 ? 'center' : 'flex-end',
                padding: '0 6px',
                color: '#fff',
                fontSize: 12,
                minHeight: height
              }}
              title={`${segment.label}: ${segment.value} (${Math.round(pct)}%)`}
            >
              {pct > 5 ? `${Math.round(pct)}%` : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
