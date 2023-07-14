<template>
    <div class="relative">
      <button
        class="m-auto h-full bg-white cursor-pointer px-2 rounded-md border border-gray-300"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      >
        <Icon :icon="icon" class="text-2xl" />
      </button>
      <transition name="fade">
        <div
          v-if="showTooltip"
          class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white px-2 py-1 rounded text-sm"
        >
          {{ msg }}
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import Icon from '@/components/Icon';
  
  const props = defineProps({
    icon: {
      type: String,
      default: '',
    },
    msg: {
      type: String,
      default: '',
    },
  });
  
  const showTooltip = ref(false);
  </script>
  
  <style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.1s ease;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  