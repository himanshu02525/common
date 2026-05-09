import ComplianceService from '../../roles/ComplianceOfficer/bharatModule6/ComplianceService';

export async function getAll() {
  const res = await ComplianceService.getAll();
  return res.data;
}
export async function getById(id) {
  const res = await ComplianceService.getById(id);
  return res.data;
}
export async function create(data) {
  const res = await ComplianceService.create(data);
  return res.data;
}
export async function update(id, data) {
  const res = await ComplianceService.update(id, data);
  return res.data;
}
export async function remove(id) {
  const res = await ComplianceService.delete(id);
  return res.data;
}
export async function summary() {
  const res = await ComplianceService.getSummary();
  return res.data;
}
