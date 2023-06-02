<template>
    <a @click="signInWithGitHub" href="#"
        class="inline-flex items-center min-h-40px font-sans text-sm text-white bg-gray-800 dark:bg-gray-900 dark:text-gray-300 py-2 pl-0 pr-3">
        <svg height="18" viewBox="0 0 16 16" width="40px" style="fill:white;">
            <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01
            1.08.58 1.23.82.72 1.21 1.87.87
            2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12
            0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08
            2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0
            .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
        </svg>
        Sign in with GitHub
    </a>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios'
import { onMounted } from 'vue';
import { ref } from 'vue';
import axiosClient from '@/plugins/axios';



const toast = useToast();
const router = useRouter();

const loginUrl = ref('')

const signInWithGitHub = async () => {
  window.location.href = loginUrl.value;
}

onMounted(async () => {
  try {
        const response = await axiosClient.get('/api/social/login/github/')
        console.log(response.data.auth_url)
        loginUrl.value = response.data.auth_url
    }
    catch (error) {
        console.log(error)
        toast.error('Ha ocurrido un error en la carga, por favor intenta más tarde');
    }
});


</script>
