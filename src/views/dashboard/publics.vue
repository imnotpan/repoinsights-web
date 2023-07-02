<template>
  <div v-if="serverError" class="w-full text-center">
    <span class="text-xl font-bold dark:text-white text-slate-700">Ha ocurrido un problema...</span>
  </div>

  <div v-else>
    <div class="col-span-4 fromGroup relative">
      <span class="text-lg font-semibold">Proyectos disponibles</span>
      <vSelect name="name" id="id" :multiple=true :options="projects" label="name" :searchable=false :close-on-select=true
        v-model="selectedProjects" @update:modelValue="handleSelectChange">
      </vSelect>
    </div>

    <Tabs
      v-if="dashboards.length > 0"
      :dashboards="dashboards"
     />

  

  </div>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import Tabs from '@/components/Dashboard/Tabs.vue'

import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const dashboards = ref([])
const projects = ref([])
const dashboardIds = ref([])
const selectedProjects = ref([])
const serverError = ref(false)


const toast = useToast();


const getDashboards = async () => {
  const { data } = await axiosClient.post('/api/metabase/public/dashboards/shared/')
  dashboards.value = data.dashboards;
}

const getProjects = async () => {
  const { data } = await axiosClient.get('/api/repoinsights/projects/')
  projects.value = data.projects.data
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

const getDashboardIds = () => {
  dashboardIds.value = dashboards.value.map((dashboard) => dashboard.params.id).flat();
  selectedProjects.value = projects.value.filter((project) => dashboardIds.value.includes(project.id.toString()));
};

onMounted(async () => {
  await getPublics();
  getDashboardIds()
})


const handleSelectChange = async () => {
  const ids = selectedProjects.value.map(item => item.id);
  const { data } = await axiosClient.post('/api/metabase/public/dashboards/', { "params": { "id": ids } })
  dashboards.value = data.iframes
}
</script>