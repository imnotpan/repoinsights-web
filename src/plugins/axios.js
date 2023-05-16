import axios from 'axios';
import router from '../router/index.js';
import { useUserStore } from '@/store/user';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

axiosClient.interceptors.request.use((config) => {
  const userStore = useUserStore();
  // Configura la cabecera Authorization solo si hay un token disponible en userStore
  if (userStore.token) {
    config.headers.Authorization = `Token ${userStore.token}`;
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
