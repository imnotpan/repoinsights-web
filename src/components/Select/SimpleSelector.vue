<template>
    <div class="w-48 flex gap-2 items-center">
        <select
            class="w-full py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            name="filter" :value="selectedOption" @change="handleChange">
            <option value="">Ordenar por</option>
            <option v-for="option in options" :value="option.id" :key="option.id">
                {{ option.name }}
            </option>
        </select>
        <button class="bg-white rounded-md focus:ring-1  !border-gray-300 h-full">
            <SimpleLoader v-if="loading" />
            <div v-else @click="toggleOrder">
                <Icon :icon="selectIcon" class="text-2xl"/>
            </div>
        </button>
    </div>
</template>

<script setup>

import SimpleLoader from "@/components/Loader/simpleLoader.vue"
import { Icon } from '@iconify/vue';

import { computed, ref } from "vue";

const emit = defineEmits(['change']);
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
    },
    order:{
        type: String,
        default: "asc"
    }
})

const ascending = ref(props.order === "asc");


const handleChange = (event) => {
    const selectedOptionId = event.target.value
    const selectedOption = props.options.find(option => option.id === selectedOptionId);
    if (selectedOption) emit('change', selectedOption);
}

const toggleOrder = () => {
    ascending.value = !ascending.value;
    emit('changeOrder', ascending.value ? "asc" : "desc");
}

const selectIcon = computed(() => ascending.value ? "heroicons-outline:arrow-up" : "heroicons-outline:arrow-down");
</script>
