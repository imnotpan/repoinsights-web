<template>
    <div class="loginwrapper">
        <div class="lg-inner-column">
            <div class="left-column relative z-[1]">
                <div class="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
                    <router-link to="/">
                        <img :src="logo" alt="" class="mb-10" v-if="!this.$store.themeSettingsStore.isDark" />
                        <img :src="logoWhite" alt="" class="mb-10" v-else />
                    </router-link>

                    <h4>
                        Unlock your Project
                        <span class="text-slate-800 dark:text-slate-400 font-bold">performance</span>
                    </h4>
                </div>
                <div class="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
                    <img :src="sideImg" alt="" class="h-full w-full object-contain" />
                </div>
            </div>
            <div class="right-column relative">
                <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
                    <div class="auth-box h-full flex flex-col justify-center">
                        <div class="text-center 2xl:mb-10 mb-4">
                            <h4 class="text-slate-500 text-base">Iniciar sesión</h4>
                            <Login />
                        </div>
                        <div class="max-w-[242px] mx-auto mt-8 w-full">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import logoWhite from "@/assets/images/logo/logo-white.svg"
import logo from "@/assets/images/logo/logo.svg"
import sideImg from "@/assets/images/auth/ils1.svg"
import Login from "../common/Login.vue"

export default {
    data() {
        return {
            logoWhite, logo, sideImg
        }
    },
    components: {
        Login
    }
};
</script>
<style lang="scss"></style>
  