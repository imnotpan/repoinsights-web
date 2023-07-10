<template>
    <div>
        <TabGroup>
            <TabList class="mb-4 mt-7 flex gap-2">
                <Tab v-slot="{ selected }" as="template" v-for="(item, i) in dashboards" :key="i"
                    @click="selectedIndex = i">
                    <button :class="[
                        selected
                            ? 'text-white bg-primary-500 '
                            : 'text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300',
                    ]"
                        class="text-sm font-medium last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150">
                        {{ item.data.name }}
                    </button>
                </Tab>
            </TabList>

            <div class="relative">
                <div v-if="loading">
                    <div class=" h-64 w-full absolute top-0 left-0  flex flex-col items-center justify-center bg-white">
                        <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-primary-500"></div>
                        <div class="text-xl font-semibold ml-4 text-primary-500">Estamos cargando la información...</div>
                    </div>
                </div>
                <div :class="{ 'absolute top-0 left-0': loading }">
                    <Iframe v-for="(item, i) in dashboards" :key="`iframe-${i}`" :src="item.iframe"
                        :class="{ 'absolute top-[-9999px] left-[-9999px]': i !== selectedIndex, 'w-full h-full': i === selectedIndex }"
                        @load="handleLoad" />
                </div>
            </div>
        </TabGroup>
    </div>
</template>
  
<script setup>
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import Iframe from '@/components/Iframe/index.vue'
import { ref, watch } from 'vue';

const allLoaded = ref([]);
const loading = ref(true);

const props = defineProps({
    dashboards: {
        type: Array,
        required: true
    }
})

const selectedIndex = ref(0);

const handleLoad = () => {
    allLoaded.value.push(true);
    if (allLoaded.value.length === props.dashboards.length && loading.value) {
        console.log('Todos los iframes han terminado de cargar');
        setTimeout(() => {
            console.log('Se oculta el loader');
            loading.value = false;
        }, 2000);
    }
};

const handleDashboardsChange = () => {
    loading.value = true;
    allLoaded.value = [];
    handleLoad();
};


watch(() => props.dashboards, handleDashboardsChange);


</script>
  