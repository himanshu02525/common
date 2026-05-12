import React from "react";
// Redux import removed
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { StatusCard, Loader, EmptyState, DataUnavailable } from "../../../core/registry";

const COLORS = ["#4e73df", "#1cc88a", "#f6c23e", "#e74a3b", "#36b9cc"];

const ValueList = ({ title, data }) => {
  if (!data || data.length === 0) return null;
  return (
    <div className="p-3">
      {title && <h6 className="fw-bold mb-3">{title}</h6>}
      {data.map((item, i) => (
        <div key={i} className="d-flex justify-content-between mb-2 border-bottom pb-1">
          <span>{item.name}</span>
          <strong>{item.value ?? 0}</strong>
        </div>
      ))}
    </div>
  );
};

const CustomPie = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
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
};

const CustomBar = ({ data }) => {
  if (!data || data.length === 0) return null;
  return (
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
};

// Now receiving props from AnalyticsDashboard instead of useSelector
const Dashboard = ({ analyticsData, isLoading, error }) => {

  if (isLoading) return <Loader message="Loading dashboard..." />;
  if (error) return <EmptyState message={error} />;
  if (!analyticsData) return <EmptyState message="No data available." />;

  const taxStatus = analyticsData?.taxDetails?.status ? [
    { name: "Paid", value: analyticsData.taxDetails.status.paid ?? 0 },
    { name: "Pending", value: analyticsData.taxDetails.status.pending ?? 0 },
    { name: "Overdue", value: analyticsData.taxDetails.status.overdue ?? 0 },
    { name: "Rejected", value: analyticsData.taxDetails.status.rejected ?? 0 },
  ] : null;

  const programStatus = analyticsData?.programDetails ? [
    { name: "Active", value: analyticsData.programDetails.activePrograms ?? 0 },
    { name: "Closed", value: analyticsData.programDetails.closedPrograms ?? 0 },
  ] : null;

  const applications = analyticsData?.subsidyDetails ? [
    { name: "Pending", value: analyticsData.subsidyDetails.pendingApplications ?? 0 },
    { name: "Approved", value: analyticsData.subsidyDetails.approvedApplications ?? 0 },
    { name: "Rejected", value: analyticsData.subsidyDetails.rejectedApplications ?? 0 },
    { name: "On Hold", value: analyticsData.subsidyDetails.onHoldCount ?? 0 },
  ] : null;

  const taxStats = analyticsData?.taxDetails?.revenue ? [
    { name: "Min Tax", value: analyticsData.taxDetails.revenue.lowestTax ?? 0 },
    { name: "Avg Tax", value: analyticsData.taxDetails.revenue.averageTax ?? 0 },
    { name: "Max Tax", value: analyticsData.taxDetails.revenue.highestTax ?? 0 },
  ] : null;

  const flow = analyticsData?.subsidyDetails ? [
    { name: "Received", value: analyticsData.subsidyDetails.applicationsReceived ?? 0 },
    { name: "Verified", value: analyticsData.subsidyDetails.verifiedCount ?? 0 },
    { name: "Granted", value: analyticsData.subsidyDetails.grantedCount ?? 0 },
    { name: "Cancelled", value: analyticsData.subsidyDetails.cancelledCount ?? 0 },
  ] : null;

  return (
    <div className="row g-4">
      {taxStatus ? (
        <StatusCard
          title="Tax Compliance Status"
          listTitle="Tax Categorization"
          data={taxStatus}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />
      ) : (
        <DataUnavailable title="Tax Compliance Status" />
      )}
      
      {taxStats ? (
        <StatusCard
          title="Tax Statistics"
          listTitle="Values"
          data={taxStats}
          ChartComponent={CustomBar}
          ListComponent={ValueList}
        />
      ) : (
        <DataUnavailable title="Tax Statistics" />
      )}

      {programStatus ? (
        <StatusCard
          title="Program Status"
          data={programStatus}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />
      ) : (
        <DataUnavailable title="Program Status" />
      )}

      {applications ? (
        <StatusCard
          title="Application Status"
          data={applications}
          ChartComponent={CustomPie}
          ListComponent={ValueList}
        />
      ) : (
        <DataUnavailable title="Application Status" />
      )}

      {flow ? (
        <StatusCard
          title="Process Flow"
          listTitle="Steps"
          data={flow}
          ChartComponent={CustomBar}
          ListComponent={ValueList}
        />
      ) : (
        <DataUnavailable title="Process Flow" />
      )}
    </div>
  );
};

export default Dashboard;