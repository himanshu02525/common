import React from 'react';
import { StatItem } from '../../../../core/registry';

export default function SubsidyMetricsCard({ data = {} }) {
  if (!data) return null;

  const { amountDistributed = 0, approvedApplications = 0, applicationsReceived = 0, verifiedCount = 0 } = data;

  const totalAmountDistributed = Number(amountDistributed || 0);
  const applicationSubmissionCount = Number(applicationsReceived || 0);
  const approvedApplicationCount = Number(approvedApplications || 0);
  const verifiedApplicationCount = Number(verifiedCount || 0);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title">Subsidy Metrics</h6>
          <h3 className="mb-3">₹{totalAmountDistributed.toLocaleString()}</h3>
          <StatItem label="Applications" value={applicationSubmissionCount.toLocaleString()} />
          <StatItem label="Approved" value={approvedApplicationCount.toLocaleString()} />
          <StatItem label="Verified" value={verifiedApplicationCount.toLocaleString()} />
        </div>
      </div>
    </div>
  );
}
