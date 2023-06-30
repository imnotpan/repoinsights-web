<template>
    proyecto
    {{ id }}
    {{ project }}
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useExploreStore } from "@/store/exploreProject";


let store = useExploreStore();
const project = ref(null)


const props = defineProps({
    id: {
        type: String,
        required: true
    },
})

onMounted(async () => {
    const pr = await store.getProject(props.id)
    project.value = pr
    console.log(pr)
})

</script>