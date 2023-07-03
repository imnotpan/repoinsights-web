<template>
    <div class="w-48 flex gap-2 items-center">
        <select
            class="w-full py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            name="filter" :value="selectedOption" @change="handleChange">
            <option value="">Ordenar por</option>
            <option v-for="(option, index) in options" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
        <button class="bg-white rounded-md focus:ring-1 !border-gray-300 h-full">
            <div @click="toggleOrder" class="flex items-center gap-1">
                <div
                    :class="{ 'rotate-icon-180': store.sortDirectionInverted, 'rotate-icon-0': !store.sortDirectionInverted }">
                    <Icon icon="heroicons-outline:arrow-up" class="text-2xl" />
                </div>
            </div>
        </button>
    </div>
</template>


<script setup>

import { useExploreStore } from "@/store/exploreProject";
import { Icon } from '@iconify/vue';

const store = useExploreStore();
const emit = defineEmits(['change', 'changeOrder']);
const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    selectedOption: {
        type: String,
        default: null
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const handleChange = (event) => {
    const selectedOptionId = event.target.value
    const selectedOption = props.options.find(option => option.id === selectedOptionId);
    if (selectedOption) emit('change', selectedOption);
}

const toggleOrder = () => {
    store.sortDirectionInverted = !store.sortDirectionInverted;
    emit('changeOrder', store.sortDirectionInverted);
}

</script>

<style scoped>
.rotate-icon-180 {
    transition: transform 0.3s;
    transform: rotate(180deg);
}

.rotate-icon-0 {
    transition: transform 0.3s;
    transform: rotate(0deg);
}

</style>
