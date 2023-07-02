<template>
    {{ project }}
    <div v-for="dashboard in dashboards" :key="dashboard.iframe" class="my-8">
        <iframe v-resize="resizeOptions" :src="dashboard.iframe" frameborder="0" scrolling="no" class="min-w-full"></iframe>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useExploreStore } from "@/store/exploreProject";
import axiosClient from '@/plugins/axios';

let store = useExploreStore();
const project = ref(null)
const dashboards = ref([])
const resizeOptions = {
    log: true,
}


const props = defineProps({
    id: {
        type: String,
        required: true
    },
})

const getDashboard = async () => {
    const { data } = await axiosClient.post('/api/metabase/public/dashboards/single/', { "params": { "id": props.id } })
    dashboards.value = data.dashboards;
}

onMounted(async () => {
    Promise.all([
        await store.getProject(props.id),
        await getDashboard()
    ])
})

</script>