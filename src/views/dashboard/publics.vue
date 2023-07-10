<template>
  <div v-if="serverError" class="w-full text-center">
    <span class="text-xl font-bold dark:text-white text-slate-700">Ha ocurrido un problema...</span>
  </div>

  <div v-else>
    <div class="col-span-4 fromGroup relative">
      <span class="text-lg font-semibold">Repositorios disponibles ({{ projects.length }})</span>
      <ChipGrid 
        :projects="projects" 
        v-model="selectedProjects" 
        @chipClicked="handleSelectChange" 
        />
    </div>
    <template v-if="dashboards.length > 0">
      <Tabs :dashboards="dashboards" />
    </template>



  </div>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import "vue-select/dist/vue-select.css";
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

import ChipGrid from './ChipGrid.vue';
import Tabs from '@/components/Dashboard/Tabs.vue';

const dashboards = ref([])
const projects = ref([])
const selectedProjects = ref([])
const serverError = ref(false)


const toast = useToast();


const getDashboards = async () => {
  const { data } = await axiosClient.post('/api/metabase/public/dashboards/shared/')
  console.log(data);
  dashboards.value = data.dashboards;
}

const getProjects = async () => {
  const { data } = await axiosClient.get('/api/repoinsights/projects/favorites/', {
    params: {
      metrics: false
    }
  })
  projects.value = data.projects
  selectedProjects.value = data.projects.filter(item => item.selected).map(item => item.id)
}

const getPublics = async () => {
  try {
    Promise.all([
      await getDashboards(),
      await getProjects()
    ])
  }
  catch (error) {
    toast.error('Ha ocurrido un error en la carga, por favor intenta más tarde');
    serverError.value = true
  }
}

onMounted(async () => {
  await getPublics();
})


const handleSelectChange = async (response) => {
  const { project, selected } = response;
  if (selected) {
    selectedProjects.value.push(project.id)
  }
  else {
    const index = selectedProjects.value.findIndex(item => item === project.id)
    selectedProjects.value.splice(index, 1)
  }
  const { data } = await axiosClient.post('/api/metabase/public/dashboards/shared/', { "params": { "id": selectedProjects.value } })
  dashboards.value = data.dashboards
}
</script>