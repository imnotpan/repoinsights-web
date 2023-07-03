<template>
    <iframe 
        :src="src" 
        frameborder="0" 
        scrolling="no" 
        class="min-w-full w-[1px]" 
        v-resize="{
            log: false,
        }"
        @load="handleLoad"
    >
    </iframe>
</template>

<script setup>


const props = defineProps({
    src: {
        type: String,
        required: true
    }
})

const handleLoad = () => {
    console.log('El iframe ha terminado de cargar');
  };
</script>