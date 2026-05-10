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


export async function generateReport(scope, extraParam, reportName) {
  if (!scope) throw new Error('Scope is required');

  let baseUrl = `${API_BASE}/reports/generate-by-scope`;
  let queryParams = new URLSearchParams({ scope });

  if (extraParam) {
    if (scope === 'TAX') {
      queryParams.append('year', extraParam);
    } else if (scope === 'PROGRAM') {
      queryParams.append('id', extraParam);
    }
  }
  if (reportName) {
    queryParams.append('reportName', reportName);
  }
  console.log(`${baseUrl}?${queryParams.toString()}`);

  const apiResponse = await fetch(`${baseUrl}?${queryParams.toString()}`, {
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
  generateReport,
  fetchAll
};
