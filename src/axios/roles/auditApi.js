import AuditService from '../../roles/GovernmentAuditor/AuditService';

export async function getAll() {
  const res = await AuditService.getAll();
  return res.data;
}
export async function getById(id) {
  const res = await AuditService.getById(id);
  return res.data;
}
export async function create(data) {
  const res = await AuditService.create(data);
  return res.data;
}
export async function update(id, data) {
  const res = await AuditService.update(id, data);
  return res.data;
}
export async function remove(id) {
  // AuditService may not support delete; guard
  if (typeof AuditService.delete === 'function') {
    const res = await AuditService.delete(id);
    return res.data;
  }
  throw new Error('Delete not supported');
}
