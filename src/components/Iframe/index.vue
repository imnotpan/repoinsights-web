<template>
    <iframe 
        :src="src" 
        frameborder="0" 
        class="min-w-full w-[1px] min-h-0" 
        scrolling="no"
        v-resize="{
            log: false,
            autoResize: true
        }"
        @load="handleLoad"
    >
    </iframe>
</template>

<script setup>

const emit = defineEmits(['load']);
const props = defineProps({
    src: {
        type: String,
        required: true
    }
})

const handleLoad = () => {
    console.log('El iframe ha terminado de cargar');
    emit('load');
  };
</script>