import React from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend 
} from 'recharts';
import {StatusCard} from '../../../core/registry'; 
// Helper to transform objects like {"paid": 10} to [{name: "paid", value: 10}]
const transformToArr = (obj) => 
  Object.entries(obj).map(([name, value]) => ({ name, value }));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Reusable Chart Components ---

const SimplePieChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie data={transformToArr(data)} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
        {transformToArr(data).map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

const SimpleBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart data={transformToArr(data)}>
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

// --- Generic List Component ---

const DataList = ({ title, data }) => (
  <div>
    <h6 className="text-muted small text-uppercase mb-3">{title}</h6>
    <ul className="list-group list-group-flush bg-transparent">
      {Object.entries(data).map(([key, val]) => (
        <li key={key} className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2 border-light">
          <span className="text-capitalize text-secondary">{key.replace(/([A-Z])/g, ' $1')}</span>
          <span className="fw-bold">{typeof val === 'object' ? '---' : val.toLocaleString()}</span>
        </li>
      ))}
    </ul>
  </div>
);

// --- Main Dynamic Component ---

export default function ReportAnalytics({ record }) {
  
  if (!record) return <div className="alert alert-info">Select a report to view analytics.</div>;

  const { scope, metrics: rawMetrics } = record;
  
  const metrics = typeof rawMetrics === 'string' ? JSON.parse(rawMetrics) : rawMetrics;
  console.log(typeof rawMetrics);
  console.log(record);
  
  /**
   * Logic to determine which sections to render based on Scope
   */
  const {subsidySummary}=metrics;

  console.log("subsidySummary"+subsidySummary);
  
  const renderSections = () => {
    const cards = [];

    // 1. Handle Tax Scoped Data
    if (metrics.status) {
      cards.push(
        <StatusCard 
          key="tax-status"
          title="Tax Payment Status"
          data={metrics.status}
          ChartComponent={SimplePieChart}
          ListComponent={DataList}
          listTitle="Payment Breakdown"
        />
      );
    }

    if (metrics.revenue) {
      cards.push(
        <StatusCard 
          key="tax-rev"
          title="Revenue Analysis"
          data={metrics.revenue}
          ChartComponent={SimpleBarChart}
          ListComponent={DataList}
          listTitle="Financial Metrics"
        />
      );
    }

    // 2. Handle Program Scoped Data
    if (metrics.programDetails) {
        // If it's the specific program object from entry #4
        const detail = metrics.programDetails;
        cards.push(
            <StatusCard 
              key="prog-detail"
              title={`Program: ${detail.title || 'Overview'}`}
              data={{ 
                  Budget: detail.budget, 
                  Remaining: detail.remainingAmount || metrics.totalBudget,
                  Utilized: detail.approvedAmount || 0 
              }}
              ChartComponent={SimplePieChart}
              ListComponent={DataList}
            />
        );
    }

    // 3. Handle Subsidy Scoped Data
    if (metrics.subsidyStatusDistribution || (metrics.subsidyDetails && metrics.subsidyDetails.onHoldCount)) {
        const subData = metrics.subsidyDetails || metrics;
        cards.push(
            <StatusCard 
              key="subsidy-flow"
              title="Subsidy Distribution"
              data={subData.subsidyStatusDistribution || {
                  OnHold: subData.onHoldCount,
                  Granted: subData.grantedCount,
                  Verified: subData.verifiedCount,
                  Cancelled: subData.cancelledCount
              }}
              ChartComponent={SimpleBarChart}
              ListComponent={DataList}
            />
        );
    }

    return cards;
  };

  return (
    <div className="container-fluid py-4">
      <div className="mb-4">
        <h4 className="fw-bold">{record.report_name}</h4>
        <span className="badge bg-primary">{scope}</span>
        <small className="text-muted ms-3">{record.generated_date}</small>
      </div>
      <div className="row">
        {renderSections()}
      </div>
    </div>
  );
}