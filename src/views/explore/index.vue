<template>
    <h1 class="my-8 text-2xl text-center">Proyectos destacados</h1>
    <div class="featured grid grid-cols-11 gap-4 mb-10">
        <Card className="col-span-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer">
            <div class="flex gap-2">
                <img src="https://avatars.githubusercontent.com/u/1496237" width="64" height="64" class="w-10 h-10">
                <div class="flex flex-col">
                    <h4 class="powner">Project owner name</h4>
                    <h5 class="pname">Project name</h5>
                </div>
            </div>
            <span class="description my-2">1k lines - Python</span>
            <ul class="w-full">
                <li class="border-y py-2">
                    <RatingData rating="C" text="Stars" value="90" size="xs" />
                </li>
                <li class="border-y py-2">
                    <RatingData rating="D" text="Stars" value="322.2" size="xs" />
                </li>
                <li class="border-y py-2">
                    <RatingData rating="E" text="Stars" value="231" size="xs" />
                </li>
                <li class="border-y py-2">
                    <RatingData rating="A" text="Stars" value="10" size="xs" />
                </li>
                <li class="border-y py-2">
                    <RatingData rating="A" text="Stars" value="3432" size="xs" />
                </li>
                <li class="py-2">
                    <RatingData rating="F" text="Stars" value="0.02" size="xs" />
                </li>
            </ul>
        </Card>

    </div>
    <div class="grid grid-cols-12 gap-10">
        <Card className="col-span-3" bodyClass="p-2 relative">
            <p class="font-medium py-3 border-b">Filtros</p>
            <Filter filterName="Lenguajes" :options="langOptions" selectionMode="multiple" />
            <Filter filterName="Estrellas" :options="starsOptions" />
            <Filter filterName="Commits" :options="commitsOptions" />
        </Card>

        <div className="col-span-8">
            <div class="flex justify-between">
                <SearchBar placeholder="Buscar proyectos..." />
                <p><span class="font-medium">1000</span> proyectos</p>
            </div>
            <Card className="my-5">
                <div class="flex gap-4 items-center mb-1">
                    <Icon icon="heroicons-outline:star" class="text-lg text-primary-500 cursor-pointer" />
                    <a href="#">
                        <h4 class="text-primary-500 font-medium text-base flex gap-1">
                            <div class="underline font-normal">P owner</div>/<div class="underline ">P name</div>
                        </h4>
                    </a>
                </div>
                <div class="text-xs text-secondary-600">
                    <p class="flex gap-2">
                    <div>
                        <span><span class="font-medium">Última extracción:</span> 12/12/2021</span>
                    </div>
                    |
                    <div>
                        <span><span class="font-medium">Lenguaje:</span> Python</span>
                    </div>
                    |
                    <div>
                        <span><span class="font-medium">Líneas de código:</span> 1000</span>
                    </div>
                    </p>
                </div>
                <hr class="my-4" />
                <div class="flex gap-8">
                    <RatingData rating="D" text="Stars" value="90" :type=2 size="xs" />
                    <RatingData rating="C" text="Stars" value="90" :type=2 size="xs" />
                    <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" />
                    <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" />
                    <RatingData rating="F" text="Stars" value="90" :type=2 size="xs" />
                    <RatingData rating="A" text="Stars" value="90" :type=2 size="xs" />
                </div>
            </Card>
        </div>

    </div>
</template>
  
<script setup>

import { ref, onMounted } from "vue";

import Card from "@/components/Card";
import SearchBar from "@/components/Explore/SearchBar";
import RatingData from "@/components/Explore/RatingData";
import Filter from "@/components/Explore/Filter";
import Icon from "@/components/Icon";

import axiosClient from "@/plugins/axios";


const langOptions = ref([])

const starsOptions = [
    {
        name: "0-100",
        count: 1000
    },
    {
        name: "100-500",
        count: 231
    }
]

const commitsOptions = [
    {
        name: "0-100",
        count: 1000
    },
    {
        name: "100-500",
        count: 231
    }
]

onMounted(async() => {
    const {data} = await axiosClient.get("/api/repoinsights/projects/langs")
    langOptions.value = data.data
    
});


</script>
  
<style scoped lang="scss">
.featured {
    td {
        padding: 0.5rem 0;
    }

    .powner {
        font-size: 0.8rem;
        font-weight: 600;
        color: #4b5563;
        line-height: 1;
    }

    .pname {
        font-size: 0.9rem;
        font-weight: 600;
        color: #1f2937;
        line-height: 1.3;
    }

    .description {
        font-size: 0.7rem;
        color: #4b5563;
    }

    .card:hover {
        transform: translate(-1px, -1px);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
}
</style>
  