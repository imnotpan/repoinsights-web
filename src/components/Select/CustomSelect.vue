<template>
    <div class="fromGroup relative">
        <span class="text-lg font-semibold">Proyectos disponibles</span>
        <v-select name="name" id="id" :multiple="multiple" :options="options" label="name" :searchable="searchable"
            :close-on-select="closeOnSelect" v-model="value" @update:modelValue="handleSelectChange"></v-select>
    </div>
</template>
  
<script setup>
import vSelect from "vue-select";
import 'vue-select/dist/vue-select.css';

const props = defineProps({
    options: {
        type: Array,
        required: true,
    },
    multiple: {
        type: Boolean,
        default: true,
    },
    searchable: {
        type: Boolean,
        default: true,
    },
    closeOnSelect: {
        type: Boolean,
        default: true,
    },
    value: {
        type: [Array, String, Number, Object],
        default: null,
    }
}
)

const emits = defineEmits(['update:modelValue']);
  
  const handleSelectChange = (newValue) => {
    // Emit the updated value to the parent component
    emit('update:modelValue', newValue);
};
</script>
  