<template>
    <h1 class="mb-8 text-2xl text-center">Proyectos destacados</h1>
    <div class="featured grid grid-cols-12 gap-4 pb-5 lg:w-3/4 mx-auto">
        <div v-if="loading.featured" v-for="index in 3" :key="index" class="col-span-4">
            <SkeletonLoader :number=1 :vertical=true :height=226 />
        </div>
        <template v-else v-for="featuredProject in featuredProjects" :key="featuredProject.id">
            <FeaturedCard :project=featuredProject @selectedProject="updateUserProjects" />
        </template>
    </div>
    <div class="grid grid-cols-12 gap-10 pt-5 border-t">
        <div class="col-span-3 z-auto self-start top-20">
            <Card className="lg:!h-fit min-h-screen" bodyClass="p-2 relative">
                <div class="py-3 border-b flex justify-between mr-2 relative">
                    <p class="font-medium">Filtros</p>
                    <div v-if="activeFilters" @click="cleanFilters"
                        class="group border border-red-700 py-1 px-2 text-xs cursor-pointer transition-colors duration-200 ease-in-out hover:bg-red-50 rounded">
                        <span class="text-red-700  transition-all duration-200 ease-in-out">Limpiar
                            filtros</span>
                    </div>
                </div>
                <div v-if="loading.filters" class="w-full m-auto">
                    <SkeletonLoader :height=25 :number=10 class="mt-4" />
                </div>
                <template v-else>
                    <Filter ref="userFilter" :filterData="projectFilters.user.info" :options="projectFilters.user.data"
                        @filterClicked="handleFilterClicked" />
                    <Filter ref="langFilter" :filterData=projectFilters.langs.info :options="projectFilters.langs.data"
                        selectionMode="multiple" @filterClicked="handleFilterClicked" />
                    <Filter ref="commitFilter" :filterData=projectFilters.commit.info :options="projectFilters.commit.data"
                        @filterClicked="handleFilterClicked" />
                </template>
            </Card>
        </div>
        <div class="col-span-8">
            <div class="flex justify-between">
                <SearchBar placeholder="Buscar proyectos..." @search="filterProjects" />
                <p><span class="font-medium">{{ projects.total }}</span> proyectos</p>
            </div>
            <template v-if="loading.projects">
                <!-- <Loader /> -->
                <SkeletonLoader :height=160 className="p-6 my-5" :number=10 />
            </template>
            <template v-else v-for="project in projects.data" key="project.id">
                <ProjectCard :project="project" @selectedProject="updateUserProjects" />
            </template>
        </div>

    </div>
</template>
  
<script setup>

import { ref, onMounted } from "vue";

import Card from "@/components/Card";
import SkeletonLoader from "@/components/Skeleton/index.vue";

import SearchBar from "@/components/Explore/SearchBar";
import ProjectCard from "@/components/Explore/ProjectCard";
import FeaturedCard from "@/components/Explore/FeaturedCard.vue";
import Filter from "@/components/Explore/Filter";

import axiosClient from "@/plugins/axios";
import { useToast } from 'vue-toastification';

const toast = useToast();

let originalprojects = {}

const activeFilters = ref(false)
const projectFilters = ref({})
const projects = ref({})
const featuredProjects = ref([])
const loading = ref({
    filters: true,
    projects: true,
    featured: true
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
    if (Object.keys(params).length !== 0 && params.constructor === Object) {
        activeFilters.value = true
    }
    else {
        activeFilters.value = false
    }
    return params;
}

const handleFilterClicked = async () => {
    await loadData()
}

const getProjects = async (params) => {
    loading.value.projects = true
    const { data } = await axiosClient.get("/api/repoinsights/explore", { params })
    projects.value = data
    originalprojects = { ...data }
    loading.value.projects = false
}

const getFilters = async (params) => {
    loading.value.filters = true
    const { data } = await axiosClient.get("/api/repoinsights/filters/", { params })
    projectFilters.value = data
    loading.value.filters = false
}

const updateUserProjects = async (project) => {
    try {
        await axiosClient.post("/api/user/projects/", {
            project_id: project.id,
            action: project.selected ? "add" : "remove"
        }).then(() => {
            toast.success("Proyecto actualizado correctamente", { timeout: 1500 })
        })
        const params = getUrlParams()
        await getFilters(params)
    }
    catch (error) {
        toast.error("Ocurrió un error al actualizar los proyectos del usuario")
    }
}


const userFilter = ref(null);
const langFilter = ref(null);
const commitFilter = ref(null);

const cleanFilters = async () => {
    userFilter.value.cleanFilters();
    langFilter.value.cleanFilters();
    commitFilter.value.cleanFilters();
    await loadData()
};


const loadData = async () => {
    const params = getUrlParams()
    await Promise.all([getFilters(params), getProjects(params)]);
}

const getFeaturedProjects = async () => {
    loading.value.featured = true
    const { data } = await axiosClient.get("/api/repoinsights/explore/featured/")
    featuredProjects.value = data.projects
    loading.value.featured = false
}

onMounted(async () => {
    await Promise.all([loadData(), getFeaturedProjects()])
});


</script>
