import axios from 'axios';
import router from '../router/index.js';
import { useUserStore } from '@/store/user';

const axiosClient = axios.create({
  // if VITE_DEV_SERVER_URL is not defined, it will use the default value
  baseURL: import.meta.env.VITE_DEV ?  'http://localhost:8000' : 'http://146.83.216.228:8000'
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
