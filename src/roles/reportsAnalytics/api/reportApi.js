const API_BASE = 'http://localhost:8087';

async function parseApiResponse(apiResponse) {
  if (!apiResponse) {
    throw new Error('No response received from the reports API');
  }
  if (!apiResponse.ok) {
    const serverText = await apiResponse.text();
    throw new Error(serverText || apiResponse.statusText || 'Reports API request failed');
  }
  return apiResponse.json();
}

export async function getAnalytics() {
  const apiResponse = await fetch(`${API_BASE}/reports/analytics`);
  return parseApiResponse(apiResponse);
}

export async function getReportById(id) {
  if (id === undefined || id === null) {
    throw new Error('getReportById requires a valid report id');
  }
  const apiResponse = await fetch(`${API_BASE}/reports/${encodeURIComponent(id)}`);
  return parseApiResponse(apiResponse);
}

export async function getReportsByScope(scope) {
  if (!scope) {
    throw new Error('getReportsByScope requires a non-empty scope');
  }
  const encodedScope = encodeURIComponent(scope);
  const apiResponse = await fetch(`${API_BASE}/reports/scope/${encodedScope}`);
  return parseApiResponse(apiResponse);
}

export async function generateReport(scope) {
  if (!scope) {
    throw new Error('generateReport requires a scope to generate');
  }
  const encodedScope = encodeURIComponent(scope);
  const apiResponse = await fetch(`${API_BASE}/reports/generate?scope=${encodedScope}`, {
    method: 'POST'
  });
  return parseApiResponse(apiResponse);
}
export async function fetchAll() {
  const apiResponse = await fetch(`${API_BASE}/reports`, { method: 'GET' });
  return parseApiResponse(apiResponse);
}
export default {
  getAnalytics,
  getReportById,
  getReportsByScope,
  generateReport,
  fetchAll
};
