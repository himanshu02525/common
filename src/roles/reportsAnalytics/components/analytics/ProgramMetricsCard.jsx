import React from 'react';
import { StatItem } from '../../../../core/registry';

export default function ProgramMetricsCard({ data = {} }) {
  if (!data) return null;

  const { totalBudget = 0, totalPrograms = 0, activePrograms = 0, closedPrograms = 0 } = data;

  const totalBudgetAmount = Number(totalBudget || 0);
  const totalProgramCount = Number(totalPrograms || 0);
  const activeProgramCount = Number(activePrograms || 0);
  const closedProgramCount = Number(closedPrograms || 0);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h6 className="card-title">Program Metrics</h6>
          <h3 className="mb-3">₹{totalBudgetAmount.toLocaleString()}</h3>
          <StatItem label="Total Programs" value={totalProgramCount.toLocaleString()} />
          <StatItem label="Active" value={activeProgramCount.toLocaleString()} />
          <StatItem label="Closed" value={closedProgramCount.toLocaleString()} />
        </div>
      </div>
    </div>
  );
}
