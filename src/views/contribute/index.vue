<template>
    <div class="w-5/6 m-auto">
        <img src="@/assets/images/github/logo-black.svg" class="m-auto my-5" width="80" />
        <div class="relative">
            <div className="text-center w-3/4 m-auto">
                <Card bodyClass="py-8 px-10 ">
                    <h1 class="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block mb-2">
                        Agrega un repositorio que te interese</h1>
                    <p class="text-sm text-slate-600 w-2/3 m-auto">Si existe un proyecto que te interesa analizar, ingresa
                        su URL</p>
                    <input 
                        type="url" 
                        class="border border-gray-300 p-2 rounded-lg w-full my-6" 
                        placeholder="https://github.com/memcached/memcached"
                        @keyup.enter="addRepository"
                        v-model="repositoryURL"
                    />
                </Card>
            </div>
        </div>
    </div>
</template>
        

<script setup>
import Card from "@/components/Card";
import { ref } from "vue";
import axiosClient from '@/plugins/axios';
import { useToast } from 'vue-toastification';


const toast = useToast();
const repositoryURL = ref(null)

const addRepository = async () => {
    try {
        const {data}  = await axiosClient.post('/api/github/contribute/', {
            url: repositoryURL.value
        })
        console.log(data)
        toast.success('Repositorio agregado correctamente')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.error)
    }
    repositoryURL.value = null
    
}

</script>