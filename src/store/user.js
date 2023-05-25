import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: {
            login: '',
            name: "",
            email: "",
            avatar: "",
            user_url: "",
            github_id: "",
            bio: "",
            company_name: "",
            location: "",
            user_url: "",
            github_id: "",
        },
        token: "",
    }),

    getters: {
    },


    actions: {
        setUser(user) {
            this.user.login = user.login
            this.user.name = user.name
            this.user.email = user.email
            this.user.avatar = user.avatar
            this.user.user_url = user.user_url
            this.user.github_id = user.github_id
            this.user.bio = user.bio
            this.user.company_name = user.company_name
            this.user.location = user.location
            this.user.user_url = user.user_url
            this.user.github_id = user.github_id

            const userJson = JSON.stringify(user);
            localStorage.setItem('user', userJson);
        },

        setToken(token) {
            this.token = token
            localStorage.setItem('token', token)
        },

        revokeToken() {
            this.token = ""
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },

})

