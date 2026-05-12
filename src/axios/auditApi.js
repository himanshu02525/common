import apiClient from "./apiClient";

export const getAll = async () => {
  const res = await apiClient.get("/audit");
  return res.data;
};

export const getById = async (id) => {
  if (!id) throw new Error("ID required");
  const res = await apiClient.get(`/audit/${id}`);
  return res.data;
};

export const create = async (data) => {
  
  const res = await apiClient.post("/audit", data);
  console.log(res);
  return res.data;
};

export const update = async (id, data) => {
  if (!id) throw new Error("ID required");
  const res = await apiClient.put(`/audit/${id}`, data);
  return res.data;
};

export const remove = async (id) => {
  const res = await apiClient.delete(`/audit/${id}`);
  return res.data;
};

export const getSummary = async () => {
  const res = await apiClient.get("/audit/summary");
  return res.data;
};