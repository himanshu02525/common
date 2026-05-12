// --- Layout & Global Components ---
export { default as Layout } from '../components/layout/Layout';
export { default as Header } from '../components/layout/Header';
export { default as Footer } from '../components/layout/Footer';
export { default as Sidebar } from '../components/layout/Sidebar';

// --- Common & Generic UI Components ---
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
export { default as BackButton } from '../components/common/compliance/BackButton';
export { default as DataUnavailable } from '../components/common/compliance/DataUnavailable';
export { default as CharacterAllow } from '../components/common/compliance/CharacterAllow';
export { default as BootstrapSwitch } from '../components/ui/BootstrapSwitch';
export { default as CachedIcon } from '@mui/icons-material/Cached';

// --- Compliance Officer Module ---
export { default as ComplianceDashboard } from '../roles/ComplianceOfficer/pages/ComplianceDashboard';
export { default as ComplianceCreate } from '../roles/ComplianceOfficer/pages/ComplianceCreate';
export { default as ComplianceEdit } from '../roles/ComplianceOfficer/pages/ComplianceEdit';
export { default as DisplayAllCompliance } from '../roles/ComplianceOfficer/pages/DisplayAllCompliance';
export { default as DisplayOneRecord } from '../roles/ComplianceOfficer/pages/DisplayOneRecord';
export { default as ComplianceSummary } from '../roles/ComplianceOfficer/components/ComplianceSummary';
export { default as CitizenBusinessDetails } from '../roles/ComplianceOfficer/components/CitizenBusinessDetails';
export { default as FundingProgramDetails } from '../roles/ComplianceOfficer/components/FundingProgramDetails';
export { default as SubsidyDetails } from '../roles/ComplianceOfficer/components/SubsidyDetails';
export { default as TaxDetails } from '../roles/ComplianceOfficer/components/TaxDetails';

// --- Government Auditor Module ---
export { default as AuditDashboard } from '../roles/GovernmentAuditor/pages/AuditDashboard';
export { default as AuditCreate } from '../roles/GovernmentAuditor/pages/AuditCreate';
export { default as AuditEdit } from '../roles/GovernmentAuditor/pages/AuditEdit';
export { default as AuditDetails } from '../roles/GovernmentAuditor/pages/AuditDetails';
export { default as DisplayAllAudits } from '../roles/GovernmentAuditor/pages/DisplayAllAudits';
export { default as DisplayOneAudit } from '../roles/GovernmentAuditor/components/DisplayOneAudit';
export { default as AuditSummary } from '../roles/GovernmentAuditor/components/AuditSummary';
export { default as ReportsDashboard } from '../roles/reportsAnalytics/pages/ReportsDashboard';
export { default as ReportsList } from '../roles/reportsAnalytics/components/report/ReportsList';
export { default as ReportCard } from '../roles/reportsAnalytics/components/report/ReportCard';
export { default as CreateReport } from '../roles/reportsAnalytics/pages/CreateReport';
export { default as CreateReportForm } from '../roles/reportsAnalytics/components/generate/CreateReportForm';
export { default as ScopeSelector } from '../roles/reportsAnalytics/components/generate/ScopeSelector';
export { default as AnalyticsDashboard } from '../roles/reportsAnalytics/pages/AnalyticsDashboard';
export { default as ReportDetails } from '../roles/reportsAnalytics/pages/ReportDetails';
export { default as ReportViewer } from '../roles/reportsAnalytics/components/report/ReportViewer';
export { default as TaxMetricsCard } from '../roles/reportsAnalytics/components/report/TaxMetricsCard';
export { default as ProgramMetricsCard } from '../roles/reportsAnalytics/components/report/ProgramMetricsCard';
export { default as SubsidyMetricsCard } from '../roles/reportsAnalytics/components/report/SubsidyMetricsCard';
export { default as GenericMetricsCard } from '../roles/reportsAnalytics/components/common/GenericMetricsCard';
export { default as MetricsGrid } from '../roles/reportsAnalytics/components/common/MetricsGrid';
export { default as Dashboard } from '../roles/reportsAnalytics/components/Dashboard';
export { default as StatusCard } from '../components/common/report/StatusCard';


// api imports
export { default as complianceApi } from '../axios/complianceApi';
export { default as auditApi } from '../axios/auditApi';
export { default as reportApi } from '../axios/reportsAnalyticsApi';