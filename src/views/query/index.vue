<template>
    <div class="container mx-auto px-4 max-w-4xl md:px-0">
        <input 
            type="text" 
            autofocus
            class="border border-slate-400 p-2 rounded-lg w- my-6 mt-8 w-full active:border-slate-800 focus:border-slate-800 focus:outline-none"
            placeholder="Envía mensaje a Repo-insight"
            @keyup.enter="sendPrompt"
            v-model="userPrompt"
        />
        <button 
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            @click="sendPrompt"
        >
            Enviar
        </button>
    </div>
</template>
        

<script setup>
import Card from "@/components/Card";
import { ref } from "vue";
import axiosClient from '@/plugins/axios';
import { useToast } from 'vue-toastification';

const userPrompt = ref(null)
const toast = useToast();

const sendPrompt = async() => {
    try {
        console.log(userPrompt.value)
        userPrompt.value = ""
        toast.success('Prompt enviado satisfactoriamente')
    }catch (error) {
        console.log(error)
        toast.error(error.response.data.error)
    }
}

</script>