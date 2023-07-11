<template>
    <iframe 
        :src="src" 
        frameborder="0" 
        class="min-w-full w-[1px] min-h-0" 
        scrolling="no"
        v-resize="{
            log: true,
            onResize: () => {
                console.log('El iframe ha cambiado de tamaño');
            },
            onResizeEnd: () => {
                console.log('El iframe ha terminado de cambiar de tamaño');
            }
        }"
        @load="handleLoad"
    >
    </iframe>
</template>

<script setup>
import { getCurrentInstance, onMounted } from 'vue';

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

const isSameOrigin = () => {
    const currentVM = getCurrentInstance();
    const currentOrigin = new URL(currentVM.proxy.$el.src).origin;
    const iframeOrigin = new URL(props.src).origin;

    return currentOrigin === iframeOrigin;
};

onMounted(() => {
    if (isSameOrigin()) {
        console.log('El iframe es del mismo origen');
    }
});
</script>
