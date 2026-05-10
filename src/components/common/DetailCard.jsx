import React from 'react';
import './DetailCard.css';
import BackButton from './compliance/BackButton';

const DetailCard = ({
  title,
  subtitle,
  badge,
  date,
  children,
  actions,
}) => {
  return (
    <div className="detailcard-container">
    <div className="m-2">
        <BackButton />
      </div>

      <div className="card detail-card">
        <div className="card-header bg-transparent border-0 pt-3 pb-0 px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex flex-column align-items-start">
              {badge}
              {date && <div className="text-muted small mt-1">{date}</div>}
            </div>

            <div className="detail-actions d-flex gap-2">
              {actions}
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="mb-4">
            <h5 className="mb-0 fw-bold">{title}</h5>
            {subtitle && <div className="text-muted small">{subtitle}</div>}
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