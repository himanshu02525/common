import axios from 'axios';

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : (window?.REACT_APP_API_BASE || 'http://localhost:8086');

const api = axios.create({
  baseURL: BASE
});

const AuditService = {
  getAll: () => api.get('/audit'),
  getById: (id) => api.get(`/audit/${id}`),
  create: (data) => api.post('/audit', data),
  update: (id, data) => api.patch(`/audit/${id}`, data),
  // delete: (id) => api.delete(`/audit/${id}`), // deleted/disabled to prevent accidental removals
  getSummary: () => api.get('/audit/summary'),
  findByOfficerId: (officerId) => api.get(`/audit/officer/${officerId}`),
};

export default AuditService;
