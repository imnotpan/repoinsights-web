<template>
    <div class="search-bar flex items-center">
      <div
        class="px-2 py-1 rounded-md border border-gray-300 flex items-center"
        :class="{ 'border-blue-500': isFocused }"
      >
        <Icon icon="heroicons-outline:search" class="search-icon" />
        <input
          type="text"
          v-model="searchTerm"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="isFocused = false"
          class="bg-transparent focus:outline-none"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  import Icon from "@/components/Icon";
  
  const props = defineProps({
    placeholder: {
      type: String,
      default: 'Buscar',
    },
  });
  
  const searchTerm = ref('');
  const isFocused = ref(false);
  
  const handleInput = () => {
    if (searchTerm.value.length > 3) {
      // Aquí puedes implementar la lógica de búsqueda por cada carácter ingresado
      console.log('Realizando búsqueda por cada carácter:', searchTerm.value);
    }
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    margin-right: 0.5rem;
  }
  
  .search-input {
    margin-right: 0.5rem;
  }
  
  .search-input:focus-within {
    border-color: #3b82f6;
  }
  
  .search-button {
    cursor: pointer;
  }
  </style>
  