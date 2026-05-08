import React from 'react';
import TaxMetricsCard from '../analytics/TaxMetricsCard';
import ProgramMetricsCard from '../analytics/ProgramMetricsCard';
import SubsidyMetricsCard from '../analytics/SubsidyMetricsCard';

export default function ReportViewer({ scope, metrics = {} }) {
  if (!scope) return null;

  const keyMap = {
    TAX: () => <TaxMetricsCard data={metrics.taxMetrics || metrics} />,
    PROGRAM: () => <ProgramMetricsCard data={metrics.programMetrics || metrics} />,
    SUBSIDY: () => <SubsidyMetricsCard data={metrics.subsidyMetrics || metrics} />
  };

  const Renderer = keyMap[scope?.toUpperCase()] || (() => <div className="text-muted">Unknown scope</div>);

  return (
    <div className="mt-3">
      <Renderer />
    </div>
  );
}
