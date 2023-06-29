import { defineStore } from 'pinia';
import axiosClient from "@/plugins/axios";


export const useExploreStore = defineStore({
    id: 'explore',

    state: () => ({
        originalProjects: {},
        activeFilters: false,
        projectFilters: {},
        projects: {},
        featuredProjects: [],
        loading: {
            filters: true,
            projects: true,
            featured: true,
        },
        searchTimeout: null,  // nuevo estado para el temporizador

    }),

    actions: {
        async getProject(id) {
            if (this.originalProjects.data) {
                const originalProject = this.originalProjects.data.find((project) => project.id === id);
                if (originalProject) {
                    return originalProject;
                }
            }
            const { data } = await axiosClient.get(`/api/repoinsights/explore/${id}/`);
            return data;
        },

        filterProjects(search) {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }
            this.searchTimeout = setTimeout(() => {
                if (search.length === 0) {
                    this.projects = { ...this.originalProjects };
                } else {
                    const searchTerm = search.toLowerCase();
                    const filteredProjects = this.projects.data.filter((project) => {
                        const projectName = project.name.toLowerCase();
                        const ownerName = project.owner_name.toLowerCase();
                        return projectName.includes(searchTerm) || ownerName.includes(searchTerm);
                    });
                    this.projects = { ...this.projects, data: filteredProjects, total: filteredProjects.length };
                }
            }, 300);
        },


        async loadData() {
            const params = this.getUrlParams();
            await Promise.all([this.getFilters(params), this.getProjects(params)]);
        },

        async getFeaturedProjects() {
            this.loading.featured = true;
            const { data } = await axiosClient.get("/api/repoinsights/explore/featured/");
            this.featuredProjects = data.projects;
            this.loading.featured = false;
        },

        getUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            let params = {};
            for (const [key, value] of urlParams) {
                params[key] = value;
            }
            if (Object.keys(params).length !== 0 && params.constructor === Object) {
                this.activeFilters = true;
            }
            else {
                this.activeFilters = false;
            }
            return params;
        },

        async getFilters(params) {
            this.loading.filters = true;
            const { data } = await axiosClient.get("/api/repoinsights/filters/", { params });
            this.projectFilters = data;
            this.loading.filters = false;
        },

        async getProjects(params) {
            this.loading.projects = true;
            const { data } = await axiosClient.get("/api/repoinsights/explore", { params });
            this.projects = data;
            this.loading.projects = false;
            this.originalProjects = { ...data };
        },

        async updateUserProject(project) {
            await axiosClient.post("/api/user/projects/", {
                project_id: project.id,
                action: project.selected ? "add" : "remove"
            })
        }

    },
});
