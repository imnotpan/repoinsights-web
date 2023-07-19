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
            sort: true
        },
        searchTimeout: null,
        sortFilters: [],
        sortActiveFilter: null,
        sortDirectionInverted: false,
        disableOpacity: false,
        showEmptyProjects: true
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

        filterBySearch(projects, search) {
            const searchTerm = search.toLowerCase();
            const filteredProjects = projects.filter((project) => {
                const projectName = project.name.toLowerCase();
                const ownerName = project.owner_name.toLowerCase();
                return projectName.includes(searchTerm) || ownerName.includes(searchTerm);
            });
            this.projects = { ...this.projects, data: filteredProjects, total: filteredProjects.length };

        },

        filterProjects(search) {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
            }

            this.searchTimeout = setTimeout(() => {
                if (search === null ) {
                    console.log('empty search');
                    this.projects = { ...this.projects, data: this.originalProjects.data, total: this.originalProjects.length };
                }
                else if (search.length === 0 ) {
                    console.log('empty search, reset projects');
                    this.projects = { ...this.projects, data: this.originalProjects.data, total: this.originalProjects.data.length };
                }
                else {
                        console.log('searching');
                        this.filterBySearch(this.originalProjects.data, search);
                }

            }, 300);
        },


        async loadData() {
            const params = this.getUrlParams();
            await Promise.all([
                this.getFilters(params),
                this.getProjects(params),
                this.getSortFilters(params),
            ]);
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
                // if (key !== 'sort') {
                //     params[key] = value;
                // }
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
            this.sortByFilter(params.sort);
            this.loading.projects = false;
            this.originalProjects = { ...data };
        },

        async updateUserProject(project) {
            await axiosClient.post("/api/user/projects/", {
                project_id: project.id,
                action: project.selected ? "add" : "remove"
            })
        },

        async getSortFilters(params) {
            this.loading.sort = true;
            const { data } = await axiosClient.get("/api/repoinsights/sort/");
            this.sortFilters = data.metrics;
            this.sortActiveFilter =
                params.sort
                    ? params.sort
                    : null
            this.loading.sort = false;
        },

        async sortByFilter(filter) {
            if (!filter) {
                this.sortActiveFilter = null;
                this.removeParamFromUrl('sort');

                return;
            }

            const sortFilter = this.sortFilters.find(sortFilter => sortFilter.id === filter);

            if (!sortFilter) {
                console.log('no sort filter found');
                return;
            }
            this.sortDirectionInverted = sortFilter.invert;
            this.sortActiveFilter = filter;
            this.loading.projects = true;
            this.addParamToUrl('sort', filter);

            const extractValue = (rating) => {
                const ratingValue = rating.find(rating => rating.id === filter);
                return ratingValue ? ratingValue.value : sortFilter.invert ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER;
            };

            this.projects.data.sort((a, b) => {
                const valueA = extractValue(a.rating);
                const valueB = extractValue(b.rating);
                return sortFilter.invert ? valueA - valueB : valueB - valueA;
            });


            if (!this.showEmptyProjects) {
                this.filterEmptyProjects();
            }


            this.loading.projects = false;
        },


        async sortByOrder() {
            this.loading.sort = true;

            await new Promise(resolve => {
                setTimeout(() => {
                    this.projects.data.reverse();
                    resolve();
                }, 0);
            });
            this.loading.sort = false;

        },


        addParamToUrl(key, value) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set(key, value);
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
        },

        removeParamFromUrl(key) {
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.delete(key);
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
            if (urlParams.toString().length === 0) {
                window.history.replaceState({}, '', `${window.location.pathname}`);
            }
        },

        filterEmptyProjects() {
            this.showEmptyProjects = !this.showEmptyProjects;
            if (this.showEmptyProjects) {
                this.projects = { ...this.originalProjects };
            } else {
                this.projects.data = this.projects.data.filter(project => {
                    const rating = project.rating.find(rating => rating.id === this.sortActiveFilter);
                    if (rating) {
                        return true;
                    }
                    return false;
                });
            }
            this.projects.total = this.projects.data.length;
        }


    }
});
