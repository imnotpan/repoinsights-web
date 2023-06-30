import axios from 'axios';
import router from '../router/index.js';
import { useUserStore } from '@/store/user';

const axiosClient = axios.create({
  // use .env api_url 
  baseURL:  `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`,
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
    console.log(error);
    if (error.response.status === 401) {
      const userStore = useUserStore();
      userStore.setToken(null);
      router.push({ name: 'login' });
    }
    else if (error.response.status === 403) {
      console.log('TODO');
      router.push({ name: '403' });
    }
    throw error;
  },
);

export default axiosClient;
