import React from 'react';
import './DetailCard.css';

const DetailCard = ({
  title,
  subtitle,
  badge, 
  date,
  onBack,
  children,
  actions,
}) => {
  return (
    <div className="detailcard-container">
        <div className="m-2">
                {onBack && <button className="btn btn-sm btn-primary px-4" onClick={onBack}>Back</button>}
              </div>
      <div className="card detail-card">
        <div className="mt-2 detail-actions d-flex justify-content-end align-items-center gap-2 px-3">
         {actions}
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-0">{title}</h5>
              {subtitle && <div className="text-muted small">{subtitle}</div>}
            </div>
            <div className="text-end">
              {badge}
              {date && <div className="text-muted small mt-1">{date}</div>}
              
            </div>
          </div>

          <div className="detailcard-content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
