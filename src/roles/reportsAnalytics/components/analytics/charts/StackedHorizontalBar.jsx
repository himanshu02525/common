import React from 'react';

export default function StackedHorizontalBar({ data = {}, stages = [] }) {
  const progressData = data || {};
  const stageDefinitions = stages || [];
  const values = stageDefinitions.map((stageDef) => ({ ...stageDef, value: Number(progressData[stageDef.key] || 0) }));
  const max = Math.max(...values.map((v) => v.value), 1);

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h6 className="card-title">Progress Stages</h6>
        <div className="d-flex flex-column">
          {values.map((v) => {
            const percentage = Math.round((v.value / max) * 100);
            const innerStyle = {
              width: `${percentage}%`,
              height: 20,
              background: v.color,
              borderRadius: 6,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 8,
              color: '#fff',
              fontSize: 12,
              whiteSpace: 'nowrap',
              overflow: 'hidden'
            };

            return (
              <div key={v.key} className="mb-3 px-4">
                <div className="d-flex justify-content-between small text-muted mb-1">
                  <div>{v.label}</div>
                  {/* <div>{v.value}</div> */}
                </div>
                <div style={{ background: '#f1f3f5', borderRadius: 6, position: 'relative' }} title={`${v.label}: ${v.value} (${percentage}%)`}>
                  <div style={innerStyle}>
                    {percentage > 8 ? <span style={{ textShadow: '0 1px 0 rgba(0,0,0,0.2)' }}>{percentage}%</span> : null}
                  </div>
                  {percentage <= 8 && (
                    <div style={{ position: 'absolute', left: 'calc(100% + 8px)', top: 0, height: 20, display: 'flex', alignItems: 'center' }}>
                      <small className="text-muted">{percentage}%</small>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
