// --- Layout & Global Components ---
export { default as Layout } from '../components/layout/Layout';
export { default as Header } from '../components/layout/Header';
export { default as Footer } from '../components/layout/Footer';
export { default as Sidebar } from '../components/layout/Sidebar';

// --- Common UI Components ---
export { default as Loader } from '../components/common/Loader';
export { default as EmptyState } from '../components/common/EmptyState';
export { default as Modal } from '../components/common/Modal';
export { default as ConfirmDialog } from '../components/common/ConfirmDialog';
export { default as DetailCard } from '../components/common/DetailCard';
export { default as RecordsTable } from '../components/common/RecordsTable';
export { default as SearchBar } from '../components/common/SearchBar';
export { default as StatusBadge } from '../components/common/StatusBadge';
export { default as StatItem } from '../components/ui/StatItem';
export { default as RefetchButton } from '../components/ui/RefetchButton';

// --- Compliance Officer (Bharat Module 6) ---
export { default as ComplianceDashboard } from '../roles/ComplianceOfficer/bharatModule6/ComplianceDashboard';
export { default as ComplianceCreate } from '../roles/ComplianceOfficer/bharatModule6/ComplianceCreate';
export { default as DisplayAllCompliance } from '../roles/ComplianceOfficer/bharatModule6/DisplayAllCompliance';
export { default as DisplayOneRecord } from '../roles/ComplianceOfficer/bharatModule6/DisplayOneRecord';
export { default as ComplianceEdit } from '../roles/ComplianceOfficer/bharatModule6/ComplianceEdit';

// --- Government Auditor ---
export { default as AuditDashboard } from '../roles/GovernmentAuditor/AuditDashboard';
export { default as AuditCreate } from '../roles/GovernmentAuditor/AuditCreate';
export { default as DisplayAllAudits } from '../roles/GovernmentAuditor/DisplayAllAudits';
export { default as DisplayOneAudit } from '../roles/GovernmentAuditor/DisplayOneAudit';
export { default as AuditEdit } from '../roles/GovernmentAuditor/AuditEdit';

// --- Reports & Analytics (Pages) ---
export { default as AnalyticsDashboard } from '../roles/reportsAnalytics/pages/ReportsDashboard';
export { default as ReportDetails } from '../roles/reportsAnalytics/pages/ReportDetails';
export { default as ScopeReports } from '../roles/reportsAnalytics/pages/ScopeReports';
export { default as CreateReport } from '../roles/reportsAnalytics/pages/CreateReport';
export { default as ReportsDashboardPage } from '../roles/reportsAnalytics/pages/DisplayAllReports';
export { default as ReportsDashboard } from '../roles/reportsAnalytics/pages/DisplayAllReports';

// --- Reports & Analytics (Internal Components & Charts) ---
export { default as AnalyticsOverview } from '../roles/reportsAnalytics/components/analytics/AnalyticsOverview';
export { default as ProgramMetricsCard } from '../roles/reportsAnalytics/components/analytics/ProgramMetricsCard';
export { default as SubsidyMetricsCard } from '../roles/reportsAnalytics/components/analytics/SubsidyMetricsCard';
export { default as TaxMetricsCard } from '../roles/reportsAnalytics/components/analytics/TaxMetricsCard';
export { default as DonutChart } from '../roles/reportsAnalytics/components/analytics/charts/DonutChart';
export { default as Gauge } from '../roles/reportsAnalytics/components/analytics/charts/Gauge';
export { default as HorizontalStackedBar } from '../roles/reportsAnalytics/components/analytics/charts/HorizontalStackedBar';
export { default as KPIGauge } from '../roles/reportsAnalytics/components/analytics/charts/KPIGauge';
export { default as KPIStatCard } from '../roles/reportsAnalytics/components/analytics/charts/KPIStatCard';
export { default as PieChart } from '../roles/reportsAnalytics/components/analytics/charts/PieChart';
export { default as ProgramStackedBar } from '../roles/reportsAnalytics/components/analytics/charts/ProgramStackedBar';
export { default as StackedHorizontalBar } from '../roles/reportsAnalytics/components/analytics/charts/StackedHorizontalBar';
export { default as StatusCard } from '../roles/reportsAnalytics/components/analytics/charts/StatusCard';
export { default as SubsidyPie } from '../roles/reportsAnalytics/components/analytics/charts/SubsidyPie';
export { default as TaxDonutChart } from '../roles/reportsAnalytics/components/analytics/charts/TaxDonutChart';
export { default as DisplayAllReports } from '../roles/reportsAnalytics/components/report/DisplayAllReports';
export { default as ReportCard } from '../roles/reportsAnalytics/components/report/ReportCard';
export { default as ReportsList } from '../roles/reportsAnalytics/components/report/ReportsList';
export { default as ReportViewer } from '../roles/reportsAnalytics/components/report/ReportViewer';
export { default as MetricsGrid } from '../roles/reportsAnalytics/components/common/MetricsGrid';
export { default as ReportsStatItem } from '../roles/reportsAnalytics/components/common/StatItem';
export { default as CreateReportForm } from '../roles/reportsAnalytics/components/generate/CreateReportForm';
export { default as ScopeSelector } from '../roles/reportsAnalytics/components/generate/ScopeSelector';


export { default as CachedIcon } from '@mui/icons-material/Cached';