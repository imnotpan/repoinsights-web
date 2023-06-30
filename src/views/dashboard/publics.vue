<template>
  <div v-if="serverError" class="w-full text-center">
    <span class="text-xl font-bold dark:text-white text-slate-700">Ha ocurrido un problema...</span>
  </div>
  
  <div v-else>
    <div class="grid grid-cols-8">
      <div class="col-span-4 fromGroup relative">
        <span class="text-lg font-semibold">Proyectos disponibles</span>
        <vSelect name="name" id="id" :multiple=true :options="projects" label="name" :searchable=true
          :close-on-select=true v-model="selectedProjects" @update:modelValue="handleSelectChange">
        </vSelect>
      </div>
    </div>
    <div v-for="dashboard in dashboards" :key="dashboard.iframe" class="my-8">
      <iframe :src="dashboard.iframe" frameborder="0" scrolling="no" class="w-full h-screen"></iframe>
    </div>


  </div>
</template>

<script setup>
import axiosClient from '@/plugins/axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const dashboards = ref([])
const projects = ref([])
const dashboardIds = ref([])
const selectedProjects = ref([])
const serverError = ref(false)

const toast = useToast();


const getDashboards = async () => {
  const { data } = await axiosClient.post('/api/metabase/public/dashboards/')
  dashboards.value = data.iframes;
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

<style lang="scss">
.fromGroup {
  .vs__dropdown-toggle {
    @apply bg-transparent dark:bg-slate-900 border-slate-200 dark:border-slate-700 dark:text-white min-h-[40px] text-slate-900 text-sm;
  }

  .v-select {
    @apply dark:text-slate-300;
  }

  &.has-error {
    .vs__dropdown-toggle {
      @apply border-danger-500;
    }
  }

  .vs__dropdown-option {
    @apply dark:text-slate-100;
  }

  .vs__dropdown-option--highlight {
    @apply bg-slate-900 dark:bg-slate-600 dark:bg-opacity-20 py-2 text-sm;
  }

  .vs__dropdown-menu {
    li {
      @apply capitalize;
    }
  }

  .vs__dropdown-menu {
    @apply shadow-dropdown bg-white dark:bg-slate-800 text-sm border-[0px] dark:border-[1px] dark:border-slate-700;
  }

  .vs__search::placeholder {
    @apply text-secondary-500;
  }

  .vs__actions svg {
    @apply fill-secondary-500 w-[15px] h-[15px] mt-[6px] scale-[.8];
  }

  .vs--multiple {
    background-color: white !important;

    .vs__selected {
      @apply text-xs text-slate-900 dark:text-slate-300 font-light bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-700 border rounded-[3px] h-fit;
      padding: 4px 8px !important;
    }

    .vs__deselect {
      @apply dark:fill-slate-300;
    }

    .vs__selected-options {
      @apply items-center capitalize;

      svg {
        @apply scale-[0.8];
      }
    }
  }

  .vs--single .vs__selected {
    @apply dark:text-slate-300;
  }

  .vs__dropdown-option--disabled {
    @apply bg-slate-50 dark:bg-slate-700;
  }
}</style>