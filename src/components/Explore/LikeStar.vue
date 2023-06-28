<template>
    <div>
        <Icon 
            :icon="selectedProject(project)" 
            class="text-lg text-primary-500 cursor-pointer" 
            @click="starClick(project)" 
            :className="className"
        />
    </div>

</template>

<script setup>
import Icon from "@/components/Icon";
import { defineEmits } from 'vue'

const emit = defineEmits(['starClicked'])

const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    className: {
        type: String,
        default: ''
    }
})

const selectedProject = (project) => {
    if (project.selected) {
        return 'heroicons-solid:star'
    }
    return 'heroicons-outline:star'
}

const starClick = (project) => {
    project.selected = !project.selected
    emit('starClicked', project)
}

</script>