import React from 'react';
import MetricsGrid from '../common/MetricsGrid';
import TaxMetricsCard from './TaxMetricsCard';
import ProgramMetricsCard from './ProgramMetricsCard';
import SubsidyMetricsCard from './SubsidyMetricsCard';
import KPIStatCard from './charts/KPIStatCard';
import TaxDonutChart from './charts/TaxDonutChart';
import ProgramStackedBar from './charts/ProgramStackedBar';
import StackedHorizontalBar from './charts/StackedHorizontalBar';
import SubsidyPie from './charts/SubsidyPie';
import KPIGauge from './charts/KPIGauge';

export default function AnalyticsOverview({ analytics = {} }) {
  const { taxDetails = {}, programDetails = {}, subsidyDetails = {} } = analytics;

  return (
    <section>
      

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6 col-lg-4">
          <KPIStatCard title="Revenue Collected" value={`₹${(taxDetails.revenueCollected || 0).toLocaleString()}`} subtitle={`Taxpayers: ${taxDetails.totalTaxpayers || 0}`} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <KPIStatCard title="Total Budget" value={`₹${(programDetails.totalBudget || 0).toLocaleString()}`} subtitle={`Programs: ${programDetails.totalPrograms || 0}`} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <KPIGauge value={subsidyDetails.amountDistributed || 0} max={programDetails.totalBudget || 1000000} />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <TaxDonutChart data={taxDetails} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <ProgramStackedBar data={programDetails} />
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <SubsidyPie data={subsidyDetails} />
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-12 col-lg-8">
          <StackedHorizontalBar
            data={subsidyDetails}
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
