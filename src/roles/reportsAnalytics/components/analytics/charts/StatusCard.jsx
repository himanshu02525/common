import React from 'react';

export default function StatusCard({ title = '', value = '', subtitle = '', color = '#0d6efd' }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-start">
          <div style={{ width: 8, height: 48, background: color, borderRadius: 4, marginRight: 12 }} aria-hidden="true"></div>
          <div>
            <div className="small text-muted">{title}</div>
            <div className="h5 mb-0">{value}</div>
            {subtitle && <div className="small text-muted">{subtitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
