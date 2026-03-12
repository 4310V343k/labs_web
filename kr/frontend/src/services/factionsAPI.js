import axios from "axios";

const api = axios.create({
  baseURL: "api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || "An error occurred";
    const errors = error.response?.data?.errors || [];

    return Promise.reject({
      message,
      errors,
      status: error.response?.status,
      data: error.response?.data,
    });
  },
);

export const factionsAPI = {
  getAll: () => api.get("/factions"),
  getById: (id) => api.get(`/factions/${id}`),
  create: (factionData) => api.post("/factions", factionData),
  update: (id, factionData) => api.put(`/factions/${id}`, factionData),
  delete: (id) => api.delete(`/factions/${id}`),
};

export default api;
