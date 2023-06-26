<template>
    <h1 class="my-8 text-2xl text-center">Proyectos destacados</h1>
    <div class="featured grid grid-cols-12 gap-4 mb-10">
        <FeaturedCard />
        <FeaturedCard />
        <FeaturedCard />
    </div>
    <div class="grid grid-cols-12 gap-10">
        <div class="sticky col-span-3 z-auto">
            <Card className="lg:!h-fit" bodyClass="p-2 relative">
                <p class="font-medium py-3 border-b">Filtros</p>
                <Filter :filterData="filters.selected" :options="selectedOptions"/>
                <Filter :filterData=filters.langs :options="langOptions" selectionMode="multiple"
                    @filterClicked="handleFilterClicked" />
                <Filter :filterData=filters.stars :options="starsOptions" />
                <Filter :filterData=filters.commits :options="commitsOptions" />
            </Card>
        </div>

        <div class="col-span-8">
            <div class="flex justify-between">
                <SearchBar placeholder="Buscar proyectos..." @search="filterProjects" />
                <p><span class="font-medium">{{ projects.total }}</span> proyectos</p>
            </div>
            <template v-for="project in projects.data" key="project.id">
                <ProjectCard :project="project" @selectedProject="updateUserProjects" />
            </template>
        </div>

    </div>
</template>
  
<script setup>

import { ref, onMounted } from "vue";

import Card from "@/components/Card";
import SearchBar from "@/components/Explore/SearchBar";
import ProjectCard from "@/components/Explore/ProjectCard";
import FeaturedCard from "@/components/Explore/FeaturedCard.vue";
import Filter from "@/components/Explore/Filter";

import axiosClient from "@/plugins/axios";
import { filters } from "@/constant/filter.js";


const langOptions = ref([])
const projects = ref({})
let originalprojects = {}


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

const selectedOptions = [
    {
        name: "Seleccionados",
        count: 10
    }
]


const filterProjects = (search) => {
    if (search.length === 0) {
        projects.value = { ...originalprojects };
    } else {
        const searchTerm = search.toLowerCase();
        const filteredProjects = projects.value.data.filter((project) => {
            const projectName = project.name.toLowerCase();
            const ownerName = project.owner_name.toLowerCase();
            return projectName.includes(searchTerm) || ownerName.includes(searchTerm);
        });
        projects.value = { ...projects.value, data: filteredProjects, total: filteredProjects.length };
    }
};



const getUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let params = {};
    for (const [key, value] of urlParams) {
        params[key] = value;
    }
    return params;
};

const handleFilterClicked = async () => {
    console.log("filters changed")
    const params = getUrlParams()
    await getProjects(params)
}

const getProjects = async (params) => {
    const { data } = await axiosClient.get("/api/repoinsights/explore", { params })
    projects.value = data
    originalprojects = { ...data }
}

const getFilter = async (filter) => {
    const { data } = await axiosClient.get("/api/repoinsights/filters/" + filter)
    return data
}

const updateUserProjects = async (project) => {
    //console.log("updateUserProjects", project)
    const { data } = await axiosClient.post("/api/user/projects/", {
        project_id: project.id,
        action: project.selected ? "add" : "remove"
    })
    console.log(data)
}


onMounted(async () => {
    const {data: dataLangs} = await getFilter("langs")
    langOptions.value = dataLangs
    const {data: dataUser} = await getFilter("user")
    langOptions.value = dataUser
    const params = getUrlParams()
    await getProjects(params)

});


</script>
