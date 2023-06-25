<template>
  <div class="flex items-center justify-center rounded-full" :class="[ratingColors[rating].bg, size]">
    <span class="leading-none" :class="[ratingColors[rating].text, text]">{{ rating }}</span>
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
  size: {
    type: String,
  },
  text: {
    type: String,
  },
});
</script>
  