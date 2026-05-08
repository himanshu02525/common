import React from 'react';

export default function KPIStatCard({ title, value, subtitle }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <small className="text-muted">{title}</small>
            <h4 className="mt-1">{value}</h4>
            {subtitle && <div className="text-muted small">{subtitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
