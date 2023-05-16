<template>
  <pageLoader />
</template>

<script setup>
import { onMounted } from 'vue';
import axiosClient from '@/plugins/axios.js';
import { useUserStore } from '@/store/user'; 
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

import pageLoader from '@/components/Loader/pageLoader.vue';

onMounted(async () => {
  const userStore = useUserStore(); 
  const toast = useToast(); 
  const router = useRouter();

  const params = {};
  new URLSearchParams(window.location.search).forEach((value, name) => {
    console.log(name, value);
    params[name] = value;
  });

  const response = await axiosClient.post('/dj-rest-auth/github/', {
    code: params.code,
  }).catch((error) => {
    console.log(error.response);
    toast.error('Ha ocurrido un error al ingresar. Por favor intente más tarde');
    router.push({ name: 'Login' });
  });



  console.log(response);

  if (response.status === 200) {
    console.log(response.data);
    userStore.setToken(response.data.key);
    userStore.setUser(response.data.user);

    // redirect to home
    router.push({ name: 'Layout' });
  }
  else{
    toast.error('Something went wrong. Please try again later.');
  }
});
</script>
