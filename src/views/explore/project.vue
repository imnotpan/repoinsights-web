<template>
    <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
        <Card v-if="project">
            <div>
                <div>
                    <h6 class="pb-4">Resumen repositorio</h6>
                    <!-- <button @click="toggleCard" > {{ showCard ? 'Ocultar' : 'Mostrar' }} </button> -->
                </div>
                <table class="table-auto text-left w-full">
                    <tr>
                        <th>Nombre</th>
                        <td>{{ project.name }}</td>
                        <th>Fecha de creación</th>
                        <td>{{ toLocalDate(project.created_at) }}</td>
                    </tr>
                    <tr>
                        <th>Dueño</th>
                        <td>{{ project.owner_name }}</td>
                        <th>Fecha de actualización</th>
                        <td>{{ toLocalDate(project.last_extraction_date) }}</td>
                    </tr>
                    <tr>
                        <th>Descripción</th>
                        <td>{{ project.description }}</td>
                        <th>Visibilidad</th>
                        <td>{{ project.private ? 'Privado' : 'Público' }}</td>
                    </tr>
                    <tr>
                        <th>URL</th>
                        <td>
                            <a :href="project.html_url" target="_blank" class="text-blue-500">
                                {{ calculateHTMLUrl(project) }}
                            </a>
                        </td>
                        <th>Lenguaje</th>
                        <td>{{ project.language }}</td>
                    </tr>
                </table>
            </div>
        </Card>
    </div>
    <Tabs v-if="dashboards.length > 0" :dashboards="dashboards" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useExploreStore } from "@/store/exploreProject";
import axiosClient from '@/plugins/axios';

import Tabs from '@/components/Dashboard/Tabs.vue'
import Card from '@/components/Card/index.vue'

let store = useExploreStore();
const project = ref(null)
const dashboards = ref([])

const showCard = ref(false)

const toggleCard = () => {
    showCard.value = !showCard.value
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

const toLocalDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const calculateHTMLUrl = (project) => {
    const url = project.url;
    const urlParts = url.split('/');
    const owner = urlParts[urlParts.length - 2];
    const repo = urlParts[urlParts.length - 1];
    const htmlUrl = "https://github.com/" + owner + "/" + repo
    project.html_url = htmlUrl;
    return htmlUrl;
}

onMounted(async () => {
    Promise.all([
        project.value = await store.getProject(props.id),
        await getDashboard()
    ])
})

</script>

<style scoped lang="scss">
table {
    th {
        width: 20% !important;
        padding-right:0.5rem !important;

    }
    td {
        padding: 0.25rem 0 !important;
    }

}
</style>