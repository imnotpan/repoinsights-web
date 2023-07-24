<template>
    <div class="flex flex-row justify-center items-center gap-2 mb-4">
        <div v-for="letter in startLetters" :key="letter"
            class="cursor-pointer p-2 bg-gray-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm rounded-md"
            :class="{ '!bg-slate-800 text-white': selectedLetter === letter }"
            @click="filterByLetter(letter)">
            {{ letter }}
        </div>
    </div>

    <div class="overflow-x-auto">
        <table class="min-w-full table-auto border rounded-md">
            <thead class="justify-between">
                <tr class="bg-gray-200">
                    <th class="px-4 py-2">
                        <span class="text-slate-900">Nombre</span>
                    </th>
                    <th class="px-8 py-2">
                        <span class="text-slate-900">Descripción</span>
                    </th>
                    <th class="px-8 py-2">
                        <span class="text-slate-900">Objetivo</span>
                    </th>
                </tr>
            </thead>
            <tbody class="bg-gray-200">
                <tr class="bg-white border-2 border-gray-200" v-for="metric in filteredMetrics" :key="metric.nombre">
                    <td class="px-4 py-2 font-semibold">{{ metric.nombre }}</td>
                    <td class="px-8 py-2">{{ metric.descripcion }}</td>
                    <td class="px-8 py-2">{{ metric.objetivo }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';


const metrics = ref([
    {
        "nombre": "Hero project",
        "descripcion": "Repositorio donde el 80% de los commits es realizado por el 20% de los desarrolladores.",
        "objetivo": "El objetivo es que el conocimiento no esté en ciertos desarrolladores."
    },
    {
        "nombre": "Días contribuidos",
        "descripcion": "Porcentaje de días que se han realizado commits.",
        "objetivo": "Acercarse al 100% de días contribuidos."
    },
    {
        "nombre": "Commits en los últimos 90 días",
        "descripcion": "Cuantos commits se han realizado en los últimos 90 días desde la fecha de extracción.",
        "objetivo": "Nos indica la actividad reciente del repositorio."
    },
    {
        "nombre": "Dispersión del equipo de trabajo",
        "descripcion": "Devs que contribuyen el 80% de los commits dividido en el total de desarrolladores.",
        "objetivo": "El objetivo es acercarnos a 1. Lo que implica que el repositorio depende de una cantidad mayor de desarrolladores."
    }
].sort((a, b) => a.nombre.localeCompare(b.nombre)));

const filteredMetrics = ref(metrics.value);
const selectedLetter = ref(todos);

const todos = "Todas";

const startLetters = computed(() => {
    const letters = metrics.value.map(metric => metric.nombre[0]);
    const sorted = [...new Set(letters)].sort();
    sorted.push(todos);
    return sorted;
})

const filterByLetter = (letter) => {
    selectedLetter.value = letter;

    if (letter === todos) {
        filteredMetrics.value = metrics.value;
        return;
    }

    filteredMetrics.value = metrics.value.filter(metric => metric.nombre[0] === letter);
}

</script>


<style scoped lang="scss">
table {

    // first column width small
    td:first-child {
        width: 10%;
    }
}
</style>