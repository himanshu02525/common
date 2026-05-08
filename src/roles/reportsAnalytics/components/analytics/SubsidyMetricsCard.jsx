import React from 'react';
import StatItem from '../../../../components/ui/StatItem';

export default function SubsidyMetricsCard({ data = {} }) {
  const { amountDistributed = 0, approvedApplications = 0, applicationsReceived = 0, verifiedCount = 0 } = data;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title">Subsidy Metrics</h6>
          <h3 className="mb-3">₹{amountDistributed.toLocaleString()}</h3>
          <StatItem label="Applications" value={applicationsReceived} />
          <StatItem label="Approved" value={approvedApplications} />
          <StatItem label="Verified" value={verifiedCount} />
        </div>
      </div>
    </div>
  );
}
