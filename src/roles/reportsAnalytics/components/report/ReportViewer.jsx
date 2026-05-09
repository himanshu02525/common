import React from 'react';
import { SubsidyMetricsCard,ProgramMetricsCard,TaxMetricsCard} from '../../../../core/registry';
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
