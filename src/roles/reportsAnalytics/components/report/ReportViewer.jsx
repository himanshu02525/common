import React from 'react';
import TaxMetricsCard from '../analytics/TaxMetricsCard';
import ProgramMetricsCard from '../analytics/ProgramMetricsCard';
import SubsidyMetricsCard from '../analytics/SubsidyMetricsCard';

export default function ReportViewer({ scope, metrics = {} }) {
  if (!scope) return null;

  const reportScope = scope;
  const reportMetrics = metrics || {};

  const scopeRendererMap = {
    TAX: () => <TaxMetricsCard data={reportMetrics.taxMetrics || reportMetrics} />,
    PROGRAM: () => <ProgramMetricsCard data={reportMetrics.programMetrics || reportMetrics} />,
    SUBSIDY: () => <SubsidyMetricsCard data={reportMetrics.subsidyMetrics || reportMetrics} />
  };

  const Renderer = scopeRendererMap[reportScope?.toUpperCase()] || (() => <div className="text-muted">Unknown scope</div>);

  return (
    <div className="mt-3">
      <Renderer />
    </div>
  );
}
