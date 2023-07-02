<template>
    {{ project }}
    <Tabs
        v-if="dashboards.length > 0"
        :dashboards="dashboards"
    />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useExploreStore } from "@/store/exploreProject";
import axiosClient from '@/plugins/axios';

import Tabs from '@/components/Dashboard/Tabs.vue'

let store = useExploreStore();
const project = ref(null)
const dashboards = ref([])

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