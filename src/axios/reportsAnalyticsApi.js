import apiClient from "./apiClient";

/**
 * Fetches analytics data.
 * Endpoint: GET /reports/analytics
 */
export const getAnalytics = async () => {
  const response = await apiClient.get("/reports/analytics");
  return response.data;
};

/**
 * Fetches a specific report by its ID.
 * Endpoint: GET /reports/{id}
 */
export const fetchReportById = async (id) => {
  if (!id) throw new Error("Report ID is required");
  const response = await apiClient.get(`/reports/${id}`);
  return response.data;
};

/**
 * Fetches all available reports.
 * Endpoint: GET /reports
 */
export const fetchAll = async () => {
  const response = await apiClient.get("/reports");
  return response.data;
};


export const generateReport = async ({ scope, id = null, year = null, reportName = null }) => {
  if (!scope) throw new Error("Scope is required");

  const baseUrl = "/reports/generate-by-scope";

  const queryParams = new URLSearchParams();
  if (scope) queryParams.append('scope', scope);
  if (id) queryParams.append('id', id);
  if (year) queryParams.append('year', year);
  if (reportName) queryParams.append('reportName', reportName);


  const response = await apiClient.post(baseUrl, null, {
    params: { scope, id, year, reportName }
  });
  return response.data;

};

export const getSummaryReports = async () => {
  const response = await apiClient.get("/reports/summary");
  return response.data;
};

const reportApi = {
  getAnalytics,
  fetchReportById,
  fetchAll,
  generateReport,
  getSummaryReports
};

export default reportApi;