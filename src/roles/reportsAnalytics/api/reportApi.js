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


export async function generateReport(scope, year = '', programId = '', reportName = '') {
  if (!scope) throw new Error('Scope is required');

  const baseUrl = `${API_BASE}/reports/generate-by-scope`;
  const params = new URLSearchParams();

  params.append('scope', scope);

  if (scope === 'OVERALL') {
    if (year) params.append('year', year);
    if (programId) params.append('id', programId);
  } 
  else if (scope === 'TAX') {
    if (year) params.append('year', year);
  } 
  else if (scope === 'PROGRAM') {
    if (programId) params.append('id', programId);
  }
  if (reportName) {
    params.append('reportName', reportName);
  }

  const url = `${baseUrl}?${params.toString()}`;
  const response = await fetch(url, { method: 'POST' });

  return parseApiResponse(response);
}

export async function fetchAll() {
  const apiResponse = await fetch(`${API_BASE}/reports`, { method: 'GET' });
  return parseApiResponse(apiResponse);
}
export default {
  getAnalytics,
  getReportById,
  generateReport,
  fetchAll
};
