import apiClient from "./apiClient";

// Renamed to getAnalytics to match your thunk usage
export const getAnalytics = async () => {
  const response = await apiClient.get("/reports/analytics");
  return response.data;
};

export const fetchReportById = async (id) => {
  if (!id) throw new Error("Report ID is required");
  const response = await apiClient.get(`/reports/${id}`);
  return response.data;
};

export const fetchAll = async () => {
  const response = await apiClient.get(`/reports`);
  return response.data;
};


export const generateReport = async (scope) => {
  if (!scope) throw new Error("Scope is required");
  const response = await apiClient.post("/reports/generate-by-scope", null, { 
    params: { scope } 
  });
  return response.data;
};