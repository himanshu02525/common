import axios from 'axios';

const API_BASE = 'http://localhost:8087';

export const fetchAnalytics = async () => {
  const response = await axios.get(`${API_BASE}/reports/analytics`);
  return response.data;
};

export const fetchReportById = async (id) => {
  if (!id) throw new Error('Report ID is required');
  const response = await axios.get(`${API_BASE}/reports/${id}`);
  return response.data;
};

export const fetchReportsByScope = async (scope) => {
  if (!scope) throw new Error('Scope is required');
  const response = await axios.get(`${API_BASE}/reports/scope/${scope}`);
  return response.data;
};

export const generateReport = async (scope) => {
  if (!scope) throw new Error('Scope is required');
  const response = await axios.post(`${API_BASE}/reports/generate`, { scope });
  return response.data;
};