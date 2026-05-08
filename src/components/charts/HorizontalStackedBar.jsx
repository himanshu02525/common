import React from 'react';

export default function HorizontalStackedBar({ segments = [], height = 28 }) {
  const total = segments.reduce((a, b) => a + (b.value || 0), 0) || 1;

  return (
    <div className="w-100">
      <div style={{ display: 'flex', height }} aria-hidden>
        {segments.map((s, i) => {
          const pct = ((s.value || 0) / total) * 100;
          return (
            <div
              key={i}
              style={{
                width: `${pct}%`,
                background: s.color || '#6c757d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: pct > 8 ? 'center' : 'flex-end',
                padding: '0 6px',
                color: '#fff',
                fontSize: 12,
                minHeight: height
              }}
              title={`${s.label}: ${s.value} (${Math.round(pct)}%)`}
            >
              {pct > 5 ? `${Math.round(pct)}%` : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}
