import axios from 'axios';

const BASE = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE
  ? import.meta.env.VITE_API_BASE
  : (window?.REACT_APP_API_BASE || 'http://localhost:8086');

const api = axios.create({
  baseURL: BASE
});

const ComplianceService = {
  getAll: () => api.get('/compliance'),
  getById: (id) => api.get(`/compliance/${id}`),
  create: (data) => api.post('/compliance', data),
  update: (id, data) => api.patch(`/compliance/${id}`, data),
  delete: (id) => api.delete(`/compliance/${id}`),
  getSummary: () => api.get('/compliance/summary'),
  findByEntityId: (entityId) => api.get(`/compliance/entity/${entityId}`),
};

export default ComplianceService;
