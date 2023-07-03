<template>
    <iframe 
        :src="src" 
        frameborder="0" 
        scrolling="no" 
        class="min-w-full w-[1px]" 
        :class="$props.className"
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
    },
    className: {
        type: String,
        default: ''
    }
})

const handleLoad = () => {
    console.log('El iframe ha terminado de cargar');
  };
</script>