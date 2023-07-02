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

    <TabGroup>
      <TabList>
        <Tab v-slot="{ selected }" as="template" v-for="(item, i) in dashboards" :key="i" @click="selectedIndex = i">
          <button :class="[
            selected
              ? 'text-white bg-primary-500 '
              : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300',
          ]"
            class="text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150">
            {{ item.data.name }}
          </button>
        </Tab>
      </TabList>

      <div class="relative">
        <Iframe v-for="(item, i) in dashboards" :key="`iframe-${i}`" :src="item.iframe"
          :class="{ 'absolute top-0 left-0': i !== selectedIndex, 'w-full h-full': i === selectedIndex }"></Iframe>
      </div>
    </TabGroup>

  </div>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import Iframe from '@/components/Iframe/index.vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";


import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

const dashboards = ref([])
const projects = ref([])
const dashboardIds = ref([])
const selectedProjects = ref([])
const serverError = ref(false)
const selectedIndex = ref(0);


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