<template>
    <div class="py-1">
      <div class="pb-1 pt-4">
        <span class="font-medium text-xs">{{ filterName }}</span>
      </div>
      <div class="options">
        <button
          v-for="option in options"
          :key="option.id"
          :class="['opt', option.name === selectedOption ? 'selected' : '']"
          @click="selectOption(option)"
        >
          <span>{{ option.name }}</span>
          <span>{{ option.count }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref, onMounted } from 'vue';
  
  const props = defineProps({
    filterName: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    selectedOption: {
      type: String,
      default: ''
    }
  });
  
  const selectedOption = ref(props.selectedOption);
  
  const selectOption = (option) => {
  const filter = props.filterName;
  const selectedOptionName = option.name;

  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has(filter) && searchParams.get(filter) === selectedOptionName) {
    searchParams.delete(filter);
    selectedOption.value = null;
  } else {
    searchParams.set(filter, selectedOptionName);
    selectedOption.value = option.name;
  }

  const baseUrl = window.location.origin + window.location.pathname;
  const newUrl = `${baseUrl}?${searchParams.toString()}`;

  window.history.pushState(null, null, newUrl);
};

  onMounted(() => {
    const filter = props.filterName;
    const searchParams = new URLSearchParams(window.location.search);
    const selectedOptionIdFromUrl = searchParams.get(filter);
    selectedOption.value = selectedOptionIdFromUrl;
    console.log(selectedOptionIdFromUrl);
  });
  
  </script>
  
  <style scoped lang="scss">
  .options {
    button {
      border-radius: 0.375rem;
      padding: 0.2rem 0.5rem;
      transition: all 0.2s ease-in-out;
      border: 1px solid transparent;
      cursor: pointer;
  
      &:hover {
        border-color: #4669fa;
      }
  
      &.selected {
        background-color: #EDF0FF;
        border-color: #4669fa;
      }
    }
  
    .opt {
      font-size: 0.75rem;
      font-weight: 600;
      color: #4b5563;
      margin-top: 0.2rem;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  </style>
  