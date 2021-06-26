import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  delayed: true,
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  const auth = config;
  if (token) {
    auth.headers.Authorization = `Bearer ${token}`;
  }
  // if (config.delayed) {
  //   return new Promise((resolve) => setTimeout(() => resolve(config), 1000));
  // }
  return auth;
});

export default api;
