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
                <div v-if="loading.filters">
                    Loading...
                </div>
                <template v-else>
                    <Filter :filterData="projectFilters.user.info" :options="projectFilters.user.data"
                        @filterClicked="handleFilterClicked" />
                    <Filter :filterData=projectFilters.langs.info :options="projectFilters.langs.data"
                        selectionMode="multiple" @filterClicked="handleFilterClicked" />
                </template>
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
let originalprojects = {}


const projectFilters = ref({})
const projects = ref({})
const loading = ref({
    filters: true,
})


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
    await getFilters(params)
}

const getProjects = async (params) => {
    const { data } = await axiosClient.get("/api/repoinsights/explore", { params })
    projects.value = data
    originalprojects = { ...data }
}

const getFilters = async (params) => {
    const { data } = await axiosClient.get("/api/repoinsights/filters/", { params })
    projectFilters.value = data
}

const updateUserProjects = async (project) => {
    const { data } = await axiosClient.post("/api/user/projects/", {
        project_id: project.id,
        action: project.selected ? "add" : "remove"
    })
    const params = getUrlParams()
    await getFilters(params)
}


onMounted(async () => {
    const params = getUrlParams()
    await getFilters(params)
    loading.value.filters = false
    await getProjects(params)
});


</script>
