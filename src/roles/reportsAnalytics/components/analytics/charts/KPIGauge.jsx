import React from 'react';

export default function KPIGauge({ value = 0, max = 1000000 }) {
  const currentValue = Number(value || 0);
  const maxValue = Number(max || 1);
  const percent = Math.min(100, Math.round((currentValue / Math.max(1, maxValue)) * 100));
  const size = 120;
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body text-center">
        <h6 className="card-title">Amount Distributed</h6>
        <svg width="100%" height={size / 2} viewBox={`0 0 ${size} ${size / 2}`} preserveAspectRatio="xMidYMid meet" aria-label={`Amount distributed ${percent} percent of target`}>
          <g transform={`translate(${size / 2}, ${size / 2})`}>
            <circle r={radius} cx={0} cy={0} fill="transparent" stroke="#e9ecef" strokeWidth={12} strokeLinecap="round" />
            <circle
              r={radius}
              cx={0}
              cy={0}
              fill="transparent"
              stroke="#0d6efd"
              strokeWidth={12}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90)"
            >
              <title>{`${percent}% of target`}</title>
            </circle>
          </g>
        </svg>
        <div className="mt-2">
          <div className="h5 mb-0">₹{currentValue.toLocaleString()}</div>
          <small className="text-muted">{percent}% of target</small>
        </div>
      </div>
    </div>
  );
}
