const API_BASE = 'http://localhost:8087';

async function handleResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function getAnalytics() {
  const res = await fetch(`${API_BASE}/reports/analytics`);
  return handleResponse(res);
}

export async function getReportById(id) {
  const res = await fetch(`${API_BASE}/reports/${id}`);
  return handleResponse(res);
}

export async function getReportsByScope(scope) {
  const res = await fetch(`${API_BASE}/reports/scope/${encodeURIComponent(scope)}`);
  return handleResponse(res);
}

export async function generateReport(scope) {
  const res = await fetch(`${API_BASE}/reports/generate?scope=${encodeURIComponent(scope)}`, {
    method: 'POST'
  });
  return handleResponse(res);
}
export async function fetchAll() {
  const res = await fetch(`${API_BASE}/reports`, {
    method: 'GET'
  });
  return handleResponse(res);
}
export default {
  getAnalytics,
  getReportById,
  getReportsByScope,
  generateReport,
  fetchAll
};
