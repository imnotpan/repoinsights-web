import axios from 'axios';
import router from '../router/index.js';
import { useUserStore } from '@/store/user';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const userStore = useUserStore();
      userStore.setToken(null);
      router.push({ name: 'login' });
    }
    throw error;
  },
);

export default axiosClient;
