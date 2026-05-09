import React from 'react';
import { 
  TaxMetricsCard, 
  KPIStatCard, 
  TaxDonutChart, 
  ProgramStackedBar, 
  StackedHorizontalBar, 
  SubsidyPie, 
  KPIGauge 
} from '../../../../core/registry';
export default function AnalyticsOverview({ analytics = {} }) {
  if (!analytics) return null;

  const analyticsPayload = analytics;
  const { taxDetails = {}, programDetails = {}, subsidyDetails = {} } = analyticsPayload;

  const taxAnalytics = taxDetails || {};
  const programAnalytics = programDetails || {};
  const subsidyAnalytics = subsidyDetails || {};

  return (
    <section>
      

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-4">
          <KPIStatCard
            title="Revenue Collected"
            value={`₹${Number(taxAnalytics.revenueCollected || 0).toLocaleString()}`}
            subtitle={`Taxpayers: ${Number(taxAnalytics.totalTaxpayers || 0)}`}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <KPIStatCard
            title="Total Budget"
            value={`₹${Number(programAnalytics.totalBudget || 0).toLocaleString()}`}
            subtitle={`Programs: ${Number(programAnalytics.totalPrograms || 0)}`}
          />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <KPIGauge value={Number(subsidyAnalytics.amountDistributed || 0)} max={Number(programAnalytics.totalBudget || 1000000)} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <TaxDonutChart data={taxAnalytics} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <ProgramStackedBar data={programAnalytics} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <SubsidyPie data={subsidyAnalytics} />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-8">
          <StackedHorizontalBar
            data={subsidyAnalytics}
            stages={[
              { key: 'applicationsReceived', label: 'Received', color: '#0d6efd' },
              { key: 'verifiedCount', label: 'Verified', color: '#6f42c1' },
              { key: 'approvedApplications', label: 'Approved', color: '#198754' },
              { key: 'onHoldCount', label: 'On Hold', color: '#ffc107' },
              { key: 'grantedCount', label: 'Granted', color: '#fd7e14' }
            ]}
          />
        </div>
        <div className="col-12 col-lg-4">
          <TaxMetricsCard data={taxDetails} />
        </div>
      </div>
    </section>
  );
}
