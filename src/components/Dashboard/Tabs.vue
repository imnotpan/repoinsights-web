<template>
    <TabGroup>
        <TabList class="mb-4 mt-7">
            <Tab 
                v-slot="{ selected }" as="template" v-for="(item, i) in dashs" :key="i" 
                @click="selectedIndex = i"
            >
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
            <Iframe 
                v-for="(item, i) in dashs" :key="`iframe-${i}`" 
                :src="item.iframe"
                :class="{ 'absolute top-[-999px] left-[-999px]': i !== selectedIndex, 'w-full h-full': i === selectedIndex }"></Iframe>
        </div>
    </TabGroup>
</template>

<script setup>
import { TabGroup, TabList, Tab } from "@headlessui/vue";
import Iframe from '@/components/Iframe/index.vue'
import { ref } from 'vue';



const props = defineProps({
    dashboards: {
        type: Array,
        required: true
    }
})


const selectedIndex = ref(0);
const dashs = ref(props.dashboards)

</script>