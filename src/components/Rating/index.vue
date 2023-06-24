<template>
    <div class="flex h-7 w-7 items-center justify-center rounded-full" :class="[ratingColors[rating].bg]">
      <span class="text-sm" :class="[ratingColors[rating].text]">{{ rating }}</span>
    </div>
  </template>
  
  <script setup>
  const ratingColors = {
    A: {
      bg: 'bg-green-300',
      text: 'text-green-800',
    },
    B: {
      bg: 'bg-green-200',
      text: 'text-green-800',
    },
    C: {
      bg: 'bg-yellow-300',
      text: 'text-yellow-800',
    },
    D: {
      bg: 'bg-yellow-200',
      text: 'text-yellow-800',
    },
    E: {
      bg: 'bg-red-300',
      text: 'text-red-800',
    },
    F: {
      bg: 'bg-red-200',
      text: 'text-red-800',
    },
  };
  
  const props = defineProps({
    rating: {
      type: String,
      default: '',
    },
  });
  </script>
  