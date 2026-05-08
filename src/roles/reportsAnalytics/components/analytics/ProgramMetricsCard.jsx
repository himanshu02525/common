import React from 'react';
import StatItem from '../../../../components/ui/StatItem';
import TaxDonutChart from './charts/TaxDonutChart';

export default function ProgramMetricsCard({ data = {} }) {
  const { totalBudget = 0, totalPrograms = 0, activePrograms = 0, closedPrograms = 0 } = data;

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title">Program Metrics</h6>
          <h3 className="mb-3">₹{totalBudget.toLocaleString()}</h3>
          <StatItem label="Total Programs" value={totalPrograms} />
          <StatItem label="Active" value={activePrograms} />
          <StatItem label="Closed" value={closedPrograms} />
        </div>
        </div>
    </div>
  );
}
