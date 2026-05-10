import React from "react";
import { useSelector } from "react-redux";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { StatusCard, Loader } from "../../../core/registry";

const COLORS = ["#4e73df", "#1cc88a", "#f6c23e", "#e74a3b", "#36b9cc"];

// ✅ VALUE LIST (RIGHT SIDE)
const ValueList = ({ title, data }) => (
  <div className="p-3">
    <h6 className="fw-bold mb-3">{title}</h6>
    {data.map((item, i) => (
      <div key={i} className="d-flex justify-content-between mb-2 border-bottom pb-1">
        <span>{item.name}</span>
        <strong>{item.value}</strong>
      </div>
    ))}
  </div>
);

// ✅ PIE
const CustomPie = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Pie data={data} dataKey="value" innerRadius={60} outerRadius={90}>
        {data.map((_, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

// ✅ BAR
const CustomBar = ({ data }) => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#4e73df" />
    </BarChart>
  </ResponsiveContainer>
);

// ✅ MAIN DASHBOARD
const Dashboard = () => {
  const { analyticsData, isLoading, error } = useSelector((state) => state.reportsAnalytics);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!analyticsData) return <div>No data available</div>;

  const taxStatus = [
    { name: "Paid", value: analyticsData.taxDetails.status.paid },
    { name: "Pending", value: analyticsData.taxDetails.status.pending },
    { name: "Overdue", value: analyticsData.taxDetails.status.overdue },
    { name: "Rejected", value: analyticsData.taxDetails.status.rejected },
  ];

  const programStatus = [
    { name: "Active", value: analyticsData.programDetails.activePrograms },
    { name: "Closed", value: analyticsData.programDetails.closedPrograms },
  ];

  const applications = [
    { name: "Pending", value: analyticsData.subsidyDetails.pendingApplications },
    { name: "Approved", value: analyticsData.subsidyDetails.approvedApplications },
    { name: "Rejected", value: analyticsData.subsidyDetails.rejectedApplications },
    { name: "On Hold", value: analyticsData.subsidyDetails.onHoldCount },
  ];

  const taxStats = [
    { name: "Min Tax", value: analyticsData.taxDetails.revenue.lowestTax },
    { name: "Avg Tax", value: analyticsData.taxDetails.revenue.averageTax },
    { name: "Max Tax", value: analyticsData.taxDetails.revenue.highestTax },
  ];

  const flow = [
    { name: "Received", value: analyticsData.subsidyDetails.applicationsReceived },
    { name: "Verified", value: analyticsData.subsidyDetails.verifiedCount },
    { name: "Granted", value: analyticsData.subsidyDetails.grantedCount },
    { name: "Cancelled", value: analyticsData.subsidyDetails.cancelledCount },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row g-4">
        {/* ✅ TAX STATUS */}
        <StatusCard
          title="Tax Compliance Status"
          listTitle="Tax Categorization"
          data={taxStatus}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />

        <StatusCard
          title="Program Status"
          data={programStatus}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />

        {/* APPLICATION STATUS */}
        <StatusCard
          title="Application Status"
          data={applications}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />

        {/* TAX STATISTICS */}
        <StatusCard
          title="Tax Statistics"
          listTitle="Values"
          data={taxStats}
          ChartComponent={CustomBar}
          ListComponent={ValueList}
        />

        {/* PROCESS FLOW */}
        <StatusCard
          title="Process Flow"
          listTitle="Steps"
          data={flow}
          ChartComponent={CustomBar}
          ListComponent={ValueList}
        />

      </div>
    </div>
  );
};

export default Dashboard;