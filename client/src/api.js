import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// For all protected calls, include the JWT
const getAuthHeaders = () => {
  const jwtToken = localStorage.getItem('jwtToken');
  return jwtToken ? { headers: { Authorization: `Bearer ${jwtToken}` } } : {};
};

// Auth APIs
export const signupHR = (data) => axios.post(`${API_BASE}/auth/hr/signup`, data);
export const login = (data) => axios.post(`${API_BASE}/auth/login`, data);

// Employee APIs
export const addEmployee = (data) =>
  axios.post(`${API_BASE}/employees`, data, getAuthHeaders());
export const getAllEmployees = () =>
  axios.get(`${API_BASE}/employees`, getAuthHeaders());
export const getMyProfile = () =>
  axios.get(`${API_BASE}/employees/my-profile`, getAuthHeaders());
// Add more as you build edit/delete, etc.
