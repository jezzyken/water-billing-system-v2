import axios from 'axios';
import store from '@/store'
import router from '@/router';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? '/api/v1'
    : 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL
});

api.interceptors.request.use(
  config => {
    const token = store.getters['users/getToken'];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      store.dispatch('users/logout');
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
