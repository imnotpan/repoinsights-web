<template>
    <div v-for="dashboard in dashboards" :key="dashboard.iframe" class="my-8">
        <iframe :src="dashboard" frameborder="0" scrolling="no" class="w-full h-screen"></iframe>
    </div>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import { onMounted, ref } from 'vue';

const dashboards = ref([]); 

const getPublics = async () => {
    const response_1 = await axiosClient.post('/api/metabase/public/dashboards/');

    dashboards.value = response_1.data.iframes;
    console.log(dashboards.value);
}

onMounted(async () => {
    getPublics();
})


</script>