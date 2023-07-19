<template>
  <div class="search-bar flex items-center">
    <div class="px-2 py-1 rounded-md border border-gray-300 flex items-center" :class="{ 'border-blue-500': isFocused }">
      <Icon icon="heroicons-outline:search" class="search-icon" />
      <input type="text" v-model="searchTerm" :placeholder="placeholder" @input="handleInput" @focus="isFocused = true"
        @blur="isFocused = false" class="bg-transparent focus:outline-none" />

      <Icon :style="{ visibility: searchTerm.length > 0 ? 'visible' : 'hidden' }" icon="heroicons-outline:x-mark"
        class="search-icon rounded-full border p-1 text-xs cursor-pointer" @click="cleanSearchTerm" transition="fade" />

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
const emit = defineEmits()


const searchTerm = ref('');
const isFocused = ref(false);

const handleInput = () => {
  emit('search', searchTerm.value);
};

const cleanSearchTerm = () => {
  console.log('cleanSearchTerm');
  searchTerm.value = '';
  emit('search', '');
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
  